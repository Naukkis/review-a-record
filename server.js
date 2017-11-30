const express 		= require('express');
const path 			= require('path');
const morgan 		= require('morgan');
const bodyParser 	= require('body-parser');
const spotify 		= require('./spotify');
const db            = require('./queries');
const router 		= require('./router');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
process.env.SECRET_KEY = "badasskeyfortokens";

app.use(express.static('client/src'));

app.use('/secure/', router);

app.get('/spotify/access-token', spotify.accessToken);
app.get('/spotify/auth', spotify.requestAuthorization);
app.get('/spotify/authcallback', spotify.authCallback);

app.post('/login', db.login);
app.post('/test-token', db.testToken);

app.get('/users/get-all-users', db.getAllUsers);
app.get('/users/get-userid/:username', db.getUserId);
app.get('/users/user-name-available/:username', db.userNameAvailable);
app.post('/users/create-user', db.createUser);
app.post('/users/delete-user', db.deleteUser);

app.post('/reviews/save-review', db.saveReview);
app.get('/reviews/artist/:spotifyid', db.getArtistReviews);
app.get('/reviews/album/:spotifyid', db.getAlbumReviews);
app.get('/reviews/:userid', db.getUserReviews);

app.get('/database/get-all-reviews', db.getAllReviews);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 404)
  .json({
    status: 'error',
	time: new Date(),
	message: err.message + " " + err.stack
  });
  console.log(err.message);
});

app.listen(3002,  function () {
  console.log('server on port 3002');
});
