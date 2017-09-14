const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const year = 2017;

// Port checking and setup.
let port = process.env.PORT ? process.env.PORT : 6464;
port = app.set('port', port).get('port');

const rootRoute = (req, res) => {
  res.send('dist/index.html');
};

const scheduleRoute = (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/schedule' + year + '.csv'));
};

const postServerConfiguration = () => {
  console.log(`Media Center running on port ${port}!`);
};

// Set up static directories.
app.use(express.static('dist'));
app.use(express.static('assets'));

// Begin assignment.
app.get('/', rootRoute);
app.get('/schedule', scheduleRoute);

app.listen(port, postServerConfiguration);
