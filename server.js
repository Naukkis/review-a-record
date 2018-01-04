const express     = require('express');
const path        = require('path');
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const spotify 		= require('./spotify');
const db          = require('./queries');
const router      = require('./router');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
process.env.SECRET_KEY = "badasskeyfortokens";

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
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



/**
 * @api {get} /spotify/access/#current_album=:spotify_album_id Login window
 * @apiName RequestAccessToUserData
 * @apiGroup Spotify
 *
 * @apiDescription
 * Renders page that redirects Spotify login. Saves the album to play to localStorage. Redirects to /spotify/auth
 *
 * * @apiParam {String} Spotify_album_id Spotify album id to let the player know which album to play
 */
app.get('/spotify/access/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'auth.html'));
});

/**
 * @api {get} /spotify/player Web music player
 * @apiName MusicPlayer
 * @apiGroup Spotify
 *
 * @apiDescription
 * Music player wrapper to Spotify Web playback SDK to play the albums on any album page.
 */
app.get('/spotify/player', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'player.html'));
});

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
