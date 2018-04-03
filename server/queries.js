const db = require('./db');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(5);
const jwt = require('jsonwebtoken');

/**
 * @api {get} /users/:username Request users user ID
 * @apiName Request User ID
 * @apiGroup User
 *
 * @apiParam {String} username User's username.
 *
 * @apiSuccess {Number} userid user's id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
      {
          "userid": 3
      }
 *
 */
function getUserId(req, res, next) {
  db.one('select userID from users where username = $1', [req.params.username])
    .then(function (data) {
      res.status(200)
        .json({
          userid: data.userid,
        })
    })
    .catch(err => next(err));
}

/**
 * @api {get} users/user-name-available/:username Check if username is available
 * @apiName user-name-available
 * @apiGroup User
 *
 * @apiParam {String} username User's username.
 *
 * @apiSuccess {String} response is true for username available or false if already in use.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        'true'
 *     }
 *
 */
function userNameAvailable(req, res, next) {
  db.any('select 1 from users where username = $1', [req.params.username])
    .then(function (data) {
      if (data.length == 0) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    })
    .catch(err => next(err));
}

/**
 * @api {post} users/create-user Create new user
 * @apiName Create new user
 * @apiGroup User
 *
 * @apiParam {String} username username.
 * @apiParam {String} password password.
 * @apiParam {String} email email.
 * @apiParam {String} firstname firstname.
 * @apiParam {String} lastname lastname;
 *
 * @apiSuccess {json} Created new User
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
        "status": "success",
        "created_at": "2017-11-29T12:49:46.495Z",
        "message": "created new user",
        "user": "username"
    }
 *
 */
function createUser(req, res, next) {
  if (!req.body.password || !req.body.username) {
    return next(new Error("Invalid input!"));
  }

  const psw = bcrypt.hashSync(req.body.password, salt);
  const admin = req.body.admin || false;
  db.none('insert into users(username, password, email, firstname, lastname, admin)'
    + 'values($1, $2, $3, $4, $5, $6)',
    [req.body.username, psw, req.body.email, req.body.firstname, req.body.lastname, admin])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          created_at: new Date(),
          message: 'created new user',
          user: req.body.username
        });
    })
    .catch(err => next(err));
}

/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} username username.
 * @apiParam {String} password password.
 *
 * @apiSuccess {String} username username
 * @apiSuccess {String} userid user ID
 * @apiSuccess {String} token token
 * @apiSuccess {Date} Date time of login
 * @apiSuccess {String} Message message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
        "username": "username",
        "userid:" "user id",
        "token": token,
        "login_at": "2017-11-29T12:49:46.495Z",
        "message": "login successful",

    }
 *
 */
function login(req, res, next) {
  let submittedPsw = req.body.password;
  db.one('select * from users where username = $1', [req.body.username])
    .then(function (data) {
      let verified = bcrypt.compareSync(submittedPsw, data.password);
      var token = jwt.sign({ data: data }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60
      })
      if (verified) {
        delete data.password;
        res.status(200)
          .json({
            username: req.body.username,
            userid: data.userid,
            token: token,
            login_at: new Date(),
            message: 'login successful'
          })
      } else {
        res.status(400)
          .json({
            message: 'entered wrong password'
          })
      }
    })
    .catch(err => next(err));
}

function testToken(req, res) {
  var token = req.body.token || req.headers['token'];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      delete decoded.data.password;
      if (err) {
        res.status(401)
          .json({
            data: false,
            message: "Token was invalid"
          })
      } else {
        res.status(200)
          .json({
            data: true,
            userid: decoded.data.userid
          })

      }
    })
  } else {
    res.status(401)
      .json({
        data: false,
        message: "There is no token"
      })
  }
}

function deleteUser(req, res, next) {
  let submittedPsw = req.body.password;
  db.one('select * from users where username = $1', [req.body.username])
    .then(function (data) {
      let verified = bcrypt.compareSync(submittedPsw, data.password);

      if (verified) {
        delete data.password;
        deleteByUserId(data.userid);
        res.status(200)
          .json({
            username: req.body.username,
            deleted_at: new Date(),
            message: 'user deleted'
          })

      } else {
        res.status(400)
          .json({
            message: 'entered wrong password'
          })
      }
    })
    .catch(err => next(err));
}

/**
 * @api {post} reviews/save-review Save new review
 * @apiName Save-review
 * @apiGroup Reviews
 *
 * @apiParam {Number} user_id user id.
 * @apiParam {String} artist_name Name of the artist.
 * @apiParam {String} album_name Name of the album.
 * @apiParam {String} spotify_artist_id spotify artist id.
 * @apiParam {String} spotify_album_id spotify album id.
 * @apiParam {String} review_text Review text.
 *
 * @apiSuccess {json} Created new User
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
        "status": "success",
        "created_at": "2017-11-29T12:49:46.495Z",
        "message": "created new user",
        "user": "username"
    }
 *
 */
function saveReview(req, res, next) {
  let data = req.body;
  db.none('insert into reviews (userID, artist_name, album_name,'
    + 'spotify_artist_id, spotify_album_id, review_text, date_time)'
    + 'values ($1, $2, $3, $4, $5, $6, current_timestamp)',
    [data.user_id, data.artist_name, data.album_name,
    data.spotify_artist_id, data.spotify_album_id, data.review_text])

    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          created_at: new Date(),
          message: 'saved new review',
          user: req.body.username
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllReviews(req, res, next) {
  db.any('select * from reviews')

    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          received_at: new Date(),
          message: 'Retrieved ALL reviews'
        });
    })
    .catch(err => next(err));
}

/**
 * @api {get} /reviews/:artist Request reviews by artist
 * @apiName GetReviewsByArtist
 * @apiGroup Reviews
 *
 * @apiParam {String} Artist spotify id
 *
 * @apiSuccess {string} status query status.
 * @apiSuccess {Array} data Search results.
 * @apiSuccess {Date} date time of request
 * @apiSuccess {message} message result description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
        "status": "success",
        "data": [
            {
                "reviewid": 1,
                "userid": 1,
                "artist_name": "Metallica",
                "album_name": "Ride the Lightning",
                "spotify_artist_id": "2ye2Wgw4gimLv2eAKyk1NB",
                "spotify_album_id": "5rFZcoCvmCaJ1gxTMU4JTm",
                "review_text": "On muuten mahtavaa musaa"
            }
        ],
        "requested_at": "2017-11-29T12:00:47.571Z",
        "message": "received all reviews by artist"
    }
 *
 *
 * @apiError NotFound. No reviews found
 *
 * @apiErrorExample No reviews found:
 *     HTTP/1.1 200 Not OK
  {
      "status": "fail",
      "requested_at": "2017-11-29T12:33:29.197Z",
      "message": "No reviews found"
  }

 * @apiError InvalidRequest Invalid request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not OK
  {
      "status": "error",
      "time": "2017-11-29T12:15:30.486Z",
      "message": "Error message"
  }
 */
function getArtistReviews(req, res, next) {
  db.any('select * from reviews where spotify_artist_id = $1', [req.params.spotifyid])
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            requested_at: new Date(),
            message: 'received all reviews by artist',
          });
      } else {
        res.status(200)
          .json({
            status: 'fail',
            requested_at: new Date(),
            message: 'No reviews found',
          });
      }

    })
    .catch(err => next(err));
}


/**
 * @api {get} /reviews/:album Request reviews by album
 * @apiName GetReviewsByAlbum
 * @apiGroup Reviews
 *
 * @apiParam {String} Album spotify id
 *
 * @apiSuccess {string} status query status.
 * @apiSuccess {Array} data Search results.
 * @apiSuccess {Date} date time of request
 * @apiSuccess {message} message result description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
        "status": "success",
        "data": [
            {
                "reviewid": 1,
                "spotify_album_id": "0M8Ki2Dc3MkuIS0OLBKUrK",
                "username": "test",
                "date_time": "2017-11-29T12:00:47.571Z",
                "review_text": "On muuten mahtavaa musaa"
            }
        ],
        "requested_at": "2017-11-29T12:00:47.571Z",
        "message": "received all reviews by artist"
    }
 *
 *
 * @apiError NotFound. No reviews found
 *
 * @apiErrorExample No reviews found:
 *     HTTP/1.1 200 Not OK
  {
      "status": "fail",
      "requested_at": "2017-11-29T12:33:29.197Z",
      "message": "No reviews found"
  }

 * @apiError InvalidRequest Invalid request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not OK
  {
      "status": "error",
      "time": "2017-11-29T12:15:30.486Z",
      "message": "Error message"
  }
 */
function getAlbumReviews(req, res, next) {
  db.any('select reviews.reviewid, reviews.spotify_album_id, reviews.review_text, reviews.date_time, users.username '
    + 'from reviews '
    + 'left join users on reviews.userid = users.userid '
    + 'where reviews.spotify_album_id = $1', [req.params.spotifyid])
    .then(function (data) {

      if (data.length > 0) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            requested_at: new Date(),
            message: 'received all reviews by album',
          });
      } else {
        res.status(200)
          .json({
            status: 'fail',
            requested_at: new Date(),
            message: 'No reviews found',
          });
      }
    })
    .catch(err => next(err));
}

/**
 * @api {get} /reviews/:userid Request reviews by user
 * @apiName GetReviewsByUser
 * @apiGroup Reviews
 *
 * @apiParam {Number} Userid
 *
 * @apiSuccess {string} status query status.
 * @apiSuccess {Array} data Search results.
 * @apiSuccess {Date} date time of request
 * @apiSuccess {message} message result description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    {
        "status": "success",
        "data": [
            {
                "reviewid": 1,
                "userid": 1,
                "artist_name": "Metallica",
                "album_name": "Ride the Lightning",
                "spotify_artist_id": "2ye2Wgw4gimLv2eAKyk1NB",
                "spotify_album_id": "5rFZcoCvmCaJ1gxTMU4JTm",
                "review_text": "On muuten mahtavaa musaa"
            }
        ],
        "requested_at": "2017-11-29T12:00:47.571Z",
        "message": "received all reviews by artist"
    }
 *
 *
 * @apiError NotFound. No reviews found
 *
 * @apiErrorExample No reviews found:
 *     HTTP/1.1 200 Not OK
  {
      "status": "fail",
      "requested_at": "2017-11-29T12:33:29.197Z",
      "message": "No reviews found"
  }

 * @apiError InvalidRequest Invalid request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not OK
  {
      "status": "error",
      "time": "2017-11-29T12:15:30.486Z",
      "message": "Error message"
  }
 */
function getUserReviews(req, res, next) {
  let userid = parseInt(req.params.userid);
  db.any('select * from reviews where userid = $1', [userid])
    .then(function (data) {
      if (data.length > 0) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            requested_at: new Date(),
            message: 'received all reviews by user',
          });
      } else {
        res.status(200)
          .json({
            status: 'fail',
            requested_at: new Date(),
            message: 'No reviews found',
          });
      }
    })
    .catch(err => next(err));
}


/**
 * @api {get} /reviews/latest Request latest 20 reviews
 * @apiName Latest
 * @apiGroup Reviews
 *
 *
 * @apiSuccess {string} status query status.
 * @apiSuccess {Array} data latest reviews.
 * @apiSuccess {Date} requested_at time of request
 * @apiSuccess {message} message result description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
  {
    "status": "success",
    "data": [
        {
            "reviewid": 36,
            "spotify_album_id": "5u551V6w8sHMeLwycipEIG",
            "review_text": "hsjsjd",
            "date_time": "2018-03-14T13:34:40.399Z",
            "username": "pekis"
        },
        {
            "reviewid": 35,
            "spotify_album_id": "0M8Ki2Dc3MkuIS0OLBKUrK",
            "review_text": "Kissat kon koiria",
            "date_time": "2018-03-14T11:26:37.086Z",
            "username": "pekis"
        },
        {
            "reviewid": 34,
            "spotify_album_id": "3lYZwB8YHVLhTlpIbGVn5p",
            "review_text": "liirum laarum",
            "date_time": "2018-03-14T11:13:01.935Z",
            "username": "pekis"
        },
        {
            "reviewid": 33,
            "spotify_album_id": "0M8Ki2Dc3MkuIS0OLBKUrK",
            "review_text": "liiiirumlaaaaarum",
            "date_time": "2018-03-14T09:16:42.893Z",
            "username": "pekis"
        },
        "requested_at": "2018-03-24T09:00:01.185Z",
        "message": "received latest 20 reviews"
  }
 *
 * @apiError InvalidRequest Invalid request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not OK
  {
      "status": "error",
      "time": "2017-11-29T12:15:30.486Z",
      "message": "Error message"
  }
 */
function getLatestReviews(req, res, next) {
  db.any('select reviews.reviewid, reviews.spotify_album_id, reviews.review_text, reviews.date_time, users.username '
    + 'from reviews '
    + 'left join users on reviews.userid = users.userid '
    + 'order by date_time desc limit 20')
    .then((data) => {
      if (data.length > 0) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            requested_at: new Date(),
            message: 'received latest 20 reviews',
          });
      } else {
        res.status(200)
          .json({
            status: 'fail',
            requested_at: new Date(),
            message: 'No reviews found',
          });
      }
    })
    .catch(err => next(err));
}

/**
 * @api {get} admin-status/:userid Request admin status
 * @apiName Admin Status
 * @apiGroup Admin
 * 
 * @apiSuccess {boolean} admin True if user is admin.
 * @apiSuccess {Date} requested_at time of request
 * @apiSuccess {message} message result description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
  {
    "status": "success",
    "admin": true,
    "requested_at": "2018-03-24T09:00:01.185Z",
    "message": "received admin status for userid",
  }
 *
 * @apiError NotFound Not Found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
  {
      "status": "error",
      "time": "2017-11-29T12:15:30.486Z",
       "message": "No data returned from the query. 
  }
 * @apiError InvalidToken requested without a token
 *
 */
function adminStatus(req, res, next) {
  db.one('select admin from users where userid = $1', req.params.userid)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          admin: data.admin,
          requested_at: new Date(),
          message: 'received admin status for userid ' + req.params.userid,
        });
    })
    .catch(err => next(err));
}

/**
 * @api {get} secure/reviews/delete-review/ Delete review
 * @apiName DeleteReview
 * @apiGroup Reviews
 * 
 * @apiSuccess {String} status result of request
 * @apiSuccess {Date} requested_at time of request
 * @apiSuccess {message} message result description.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
  {
    "status": "success",
    "requested_at": "2018-03-24T09:00:01.185Z",
    "message": "review deleted",
  }
 *
 * @apiError NotAuthorized Not Authorized
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Authorized
  {
      "status": "error",
      "time": "2017-11-29T12:15:30.486Z",
      "message": "Not an admin, this incident will be reported. 
  }
 *
 */
function deleteReview(req, res, next) {
  db.task((t) => {
    return t.any('select admin from users where userid = $1', req.body.user_id)
      .then((result) => {
        if (result[0].admin) {
          return t.any('delete from reviews where userid = $1 and spotify_album_id = $2', [req.body.user_id, req.body.spotify_album_id])
        }
        return 'Not an admin';
      })
      .catch(err => err);
  })
    .then((data) => {
      if (data === 'Not an admin') {
        res.status(401)
          .json({
            status: 'error',
            requested_at: new Date(),
            message: 'Not an admin, this incident will be reported',
          })

      } else {
        res.status(200)
          .json({
            status: 'success',
            requested_at: new Date(),
            message: 'review deleted',
          })
      }
    })
    .catch(err => next(err));
}

function deleteByUserId(userid, next) {
  db.none('delete from users where userid = $1', userid)
    .then(() => {
      return 'success';
    })
    .catch(err => err);
}

module.exports = {
  adminStatus,
  getUserId,
  createUser,
  login,
  userNameAvailable,
  deleteUser,
  saveReview,
  getAllReviews,
  getArtistReviews,
  getAlbumReviews,
  getUserReviews,
  getLatestReviews,
  testToken,
  deleteReview,
}
