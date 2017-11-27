const express 		= require('express');
const path 			= require('path');
const morgan 		= require('morgan');
const bodyParser 	= require('body-parser');
const spotify 		= require('./spotify');
const db              = require('./queries')

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static('client/src'));

app.get('/spotify/access-token', spotify.accessToken);

app.get('/test', db.getAllUsers);

app.use(function(req, res) {
  res.status(404).send('url not found')
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});

app.listen(3002,  function () {
  console.log('server on port 3002')
});