const axios = require('axios');
const querystring = require('querystring');

/**
 * Set id and secret provided by Spotify api here
 */
const client_id = '51e6495069d64a758db210eabf85fbdb'; // Your client id
const client_secret = 'process.env.SPOTIFY_SECRET'; // Your secret;
const redirect_uri = 'https://review-a-record.herokuapp.com/spotify/authcallback/'

/**
 * @api {get} /spotify/access-token Request spotify access token
 * @apiName Access-token
 * @apiGroup Spotify
 *
 * @apiSuccess {String} status query status.
 * @apiSuccess {String} access_token Spotify access token
 * @apiSuccess {Date} received_at time of request
 * @apiSuccess {message} message result description.

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
	 	"status": "success",
	    "access_token": "BQCK0sSRe6dpYULPEEqV-XXXXXXXXX-EOURnrm0wt0POPu0WyF2eyOfiqnZq1qol0ryfdfy8H1XYg",
	    "received_at": "2017-12-09T09:55:58.543Z",
	    "message": "Retrieved new token"
    }
 *
 * @apiError NotFound Request failed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not OK
   {
      "status": "error",
      "time": "2017-11-29T12:15:30.486Z",
      "message": "Error message"
   }
 */
function accessToken(req, res, next) {
	let grant_type = querystring.stringify({ grant_type: 'client_credentials' });
	axios.post('https://accounts.spotify.com/api/token',
			grant_type,
			{
				headers:
				{
				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
				}
			}
	)
	.then(function (response) {
		res.status(200)
          .json({
            status: 'success',
            access_token: response.data.access_token,
            received_at: new Date(),
            message: 'Retrieved new token'
          });
	})
	.catch(function(err) {
		return (next(err));
	})
}

/**
 * @api {get} /spotify/auth Request user authorization to Spotify
 * @apiName UserAuthorization
 * @apiGroup Spotify
 * 
 * @apiDescription
 * Redirects the request to Spotify, where user logs in to a Spotify account and gives permission to access personal data.
 * Spotify then redirects to /spotify/authcallback. Required parameters to Spotify are 
 * 
 * response_type: to specify whitch authorization flow is used
 * client_id: Spotify application id
 * redirect_uri: Redirect url which is defined also in Spotify App Dashboard settings
 * scope: to choose which information is needed
 *
*/

function requestAuthorization(req, res, next) {
	let scope = 'streaming user-read-birthdate user-read-email user-read-private user-read-playback-state';

	res.redirect('https://accounts.spotify.com/authorize?' +
		querystring.stringify({
	      response_type: 'code',
	      client_id: client_id,
	      scope: scope,
	      redirect_uri: redirect_uri
	  	}));
}

/**
 * @api {get} /spotify/authcallback Callback
 * @apiName SpotifyCallback
 * @apiGroup Spotify
 * 
 * @apiDescription
 * Callback url where Spotify API redirects the user. A token is requested from Spotify API 
 * in exhange for the code received from the original request. 
 * The user is redirected to the music player with access and refresh tokens.
 * 
 * @apiParam {String} code An authorization code that can be exchanged for an access token. 
 *
 * @apiSuccess {string} access_token Spotify access token for the web player.
 * @apiSuccess {String} refresh_token
*/
function authCallback(req, res, next) {
	let code = req.query.code;

	let authOptions = querystring.stringify({
		code: code,
		redirect_uri: redirect_uri,
		grant_type: 'authorization_code'
	});
	axios.post('https://accounts.spotify.com/api/token',
			authOptions,
			{ headers:{
				'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
			}}
		)
		.then(function(response) {
			res.redirect('/spotify/player/#' +
				querystring.stringify({
				access_token: response.data.access_token,
				refresh_token: response.data.refresh_token
			}));
		})
		.catch(function(err) {
			return next(err);
		})
}

/**
 * Export functions
 */
module.exports = {
	accessToken,
	requestAuthorization,
	authCallback
}
