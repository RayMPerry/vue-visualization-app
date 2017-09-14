const express = require('express');
const app = express();

// Port checking and setup.
let port = process.env.PORT ? process.env.PORT : 6464;
port = app.set('port', port).get('port');

const rootRoute = (req, res) => {
  res.send('dist/index.html');
};

const postServerConfiguration = () => {
  console.log(`Media Center running on port ${port}!`);
};

// Set up static directories.
app.use(express.static('dist'));
app.use(express.static('assets'));

// Begin assignment.
app.get('/', rootRoute);
app.listen(port, postServerConfiguration);
