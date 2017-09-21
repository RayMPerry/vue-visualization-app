const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const year = process.env.YEAR || 2017;

const scheduleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `dist/`);
  },
  filename: (req, file, cb) => {
    cb(null, `schedule${year}.csv`);
  }
});

const factoidsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `dist/`);
  },
  filename: (req, file, cb) => {
    cb(null, `newsfeed${year}.csv`);
  }
});

const scheduleUpload = multer({ storage: scheduleStorage }).single('file');
const factoidsUpload = multer({ storage: factoidsStorage }).single('file');

const Twit = require('twit');
const T = new Twit({
  consumer_key: '2kr6lXC96b1efCzbP0V8ww7yx',
  consumer_secret: 'YE937gZL82c2iOAYvNTbMNSAOmWzGIDUq2zE0SGToe77nXHiFc',
  access_token: '1300929438-FXy4NqZUlkT1Ft5Xk11ZvPTQ4cMkK1QkQ1fpV0i',
  access_token_secret: 'uVIwQ9APJ2Be8S7mDNc6UGFNymh2N7EkTR3Dg7qOiG2aT'
});

const twitterHandlesToFollow = [
  '@packagingworld',
  '@Packcentric',
  '@PackagingDr',
  '@packagingtrends',
  '@healthcarepkg'
];

const twitterKeywordsToFollow = [
  '#packexpo',
  '#hcpexpo'
];

const tweetStream = T.stream('statuses/filter', {
  track: [...twitterHandlesToFollow, ...twitterKeywordsToFollow]
});

const newsfeedFile = path.join(__dirname + `/dist/newsfeed${year}.csv`);
const scheduleFile = path.join(__dirname + `/dist/schedule${year}.csv`);

// Port checking and setup.
let port = process.env.PORT ? process.env.PORT : 6464;
port = app.set('port', port).get('port');

const socketServer = require('socket.io')(port + 1);

const rootRoute = (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
};

const newsfeedRoute = (req, res) => {
  res.sendFile(newsfeedFile);
};

const scheduleRoute = (req, res) => {
  res.sendFile(scheduleFile);
};

const twitterRoute = (req, res) => {
  twitterHandlesToFollow.map(handle => {
    T.get('statuses/user_timeline', {
      screen_name: handle
    }, (err, tweets, resp) => {
      if (err) console.log(err);
      socketServer.emit('action', {
        type: 'tweet',
        data: tweets[0]
      });
    });
  });
  res.status(200).end();
};

app.use(bodyParser.urlencoded({ extended: true }));

const uploadRoute = (req, res) => {
  if (req.file) {
    fs.readFile(req.file.path, (err, data) => {
      let whichFile = (req.file.filename.indexOf('schedule') > -1) ? scheduleFile : newsfeedFile;  
      fs.writeFile(whichFile, data, (err) => {
        console.log(err);
        console.log(`File written to ./${req.file.filename}`);
        res.status(201).send(whichFile);
      }); 
    });
  } else {
    res.status(500).end('File not uploaded.');
  }
};

const postServerConfiguration = () => {
  tweetStream.on('tweet', tweet => {
    socketServer.emit('action', {
      type: 'tweet',
      data: tweet
    });
  })
  console.log(`Media Center running on port ${port}!`);
  console.log(`Socket Server running on port ${port + 1}!`);
};

// Set up static directories.
app.use(express.static('dist'));
app.use(express.static('assets'));

// Begin assignment.
app.post('/uploadSchedule', scheduleUpload, uploadRoute);
app.post('/uploadFactoids', factoidsUpload, uploadRoute);

app.get('/twitter', twitterRoute);
app.get('/schedule', scheduleRoute);
app.get('/newsfeed', newsfeedRoute);
app.get('*', rootRoute);

app.listen(port, postServerConfiguration);
