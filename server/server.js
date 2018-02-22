const express     = require('express');
const path        = require('path');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const spotify 		= require('./spotify');
const db          = require('./queries');
const router      = require('./router');

const app = express();
process.env.SECRET_KEY = "badasskeyfortokens";
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(morgan('dev'));

app.set('port', process.env.PORT || 3002);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/../client/build'));
}

app.use('/secure/', router);

app.get('/spotify/access-token', spotify.accessToken);
app.get('/spotify/auth', spotify.requestAuthorization);
app.get('/spotify/authcallback', spotify.authCallback);

app.post('/login', db.login);
app.post('/test-token', db.testToken);

app.get('/users/get-userid/:username', db.getUserId);
app.get('/users/user-name-available/:username', db.userNameAvailable);
app.post('/users/create-user', db.createUser);


app.get('/reviews/get-all-reviews', db.getAllReviews);
app.get('/reviews/artist/:spotifyid', db.getArtistReviews);
app.get('/reviews/album/:spotifyid', db.getAlbumReviews);
app.get('/reviews/latest', db.getLatestReviews);
app.get('/reviews/:userid', db.getUserReviews);

app.get('/spotify/player', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'player.html'));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 404)
  .json({
    status: 'error',
	time: new Date(),
	message: err.message + ' ' + err.stack
  });
  console.log(err.message);
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
