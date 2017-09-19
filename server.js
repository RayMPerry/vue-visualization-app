const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const Twit = require('twit');
const T = new Twit({
// Insert keys here.
});

const twitterHandlesToFollow = [
  '@packagingworld',
  '@Packcentric',
  '@PackagingDr',
  '@packagingtrends',
  '@healthcarepkg',
  '@RaycatRakittra'
];

const tweetStream = T.stream('statuses/filter', {
  track: [...twitterHandlesToFollow]
});

const year = process.env.YEAR || 2017;

// Port checking and setup.
let port = process.env.PORT ? process.env.PORT : 6464;
port = app.set('port', port).get('port');

const socketServer = require('socket.io')(port + 1);

const rootRoute = (req, res) => {
  res.send('dist/index.html');
};

const newsfeedRoute = (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/newsfeed' + year + '.csv'));
};

const scheduleRoute = (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/schedule' + year + '.csv'));
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

app.get('/', rootRoute);
app.get('/schedule', scheduleRoute);
app.get('/newsfeed', newsfeedRoute);

app.listen(port, postServerConfiguration);
