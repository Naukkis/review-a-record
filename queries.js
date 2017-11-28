const db = require('./db');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(5);
const jwt = require('jsonwebtoken');


function getAllUsers(req, res) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          received_at: new Date(),
          message: 'Retrieved ALL users'
        });
    })
    .catch(function(err) {
      res.status(500)
        .json({
          username: req.body.username,
          status: 'fail',
          time: new Date(),
          message: 'Failed to get Users',
        })
    });
}

function userNameAvailable(req, res) {
	db.any('select 1 from users where username = $1', [req.body.username])
	  .then(function(data) {
	  		if (data.length == 0) {
	  			res.status(200).send('true')
	  		} else {
	  			res.status(200).send('false')
	  		}
	  })
	  .catch(function(err) {
	  	res.status(500)
	  		.send(err.message);
	  })
}

function createUser(req, res) {
  let psw = bcrypt.hashSync(req.body.password, salt);
  db.none('insert into users(username, password)'
        + 'values($1, $2)',
        [req.body.username, psw])
    .then(function() {
      res.status(200)
     	.json({
	        status: 'success',
	        created_at: new Date(),
	        message: 'created new user',
	        user: req.body.username
	    });
	 })
    .catch(function(err) {
      res.status(500)
         .json({
          username: req.body.username,
          pass: psw,
          status: 'fail',
          time: new Date(),
          message: 'Failed to create user',
        })
    });
}

function login(req, res){
  let submittedPsw = req.body.password;
  db.one('select * from users where username = $1', [req.body.username])
    .then(function(data) {
       	let verified = bcrypt.compareSync(submittedPsw, data.password);
        var token = jwt.sign({data: data}, process.env.SECRET_KEY, {
          expiresIn: 60*60
        })
        if (verified){
          delete data.password;
          res.status(200)
          	 .json({
	            username: req.body.username,
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
    .catch(function(err){
      res.status(500).send(err.message);
    })
}

function testToken(req, res){
  var token = req.body.token || req.headers['token'];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
      if (err){
        res.status(401)
          .json({
            data: false,
            message: "Token was invalid"
          })
      } else {
        res.status(200)
          .json({
            data: true
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

function deleteUser(req, res) {
 let submittedPsw = req.body.password;
  db.one('select * from users where username = $1', [req.body.username])
    .then(function(data) {
       	let verified = bcrypt.compareSync(submittedPsw, data.password);

        if (verified){
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
    .catch(function(err){
      res.status(500).send(err.message);
    })
}


function saveReview(req, res) {
	let data = req.body;
	db.none('insert into reviews (userID, artist_name, album_name,'
			+ 'spotify_artist_id, spotify_album_id, review_text)'
			+ 'values ($1, $2, $3, $4, $5, $6)',
			[data.user_id, data.artist_name, data.album_name,
			data.spotify_artist_id, data.spotify_album_id, data.review_text])

		.then(function() {
		    res.status(200)
		       .json({
			        status: 'success',
			        created_at: new Date(),
			        message: 'saved new review',
			        user: req.body.username
			    });
			 })
		.catch(function(err) {
		    res.status(500)
		        .json({
		          username: req.body.username,
		          status: 'fail',
		          time: new Date(),
		          message: 'Failed to save review: ' + err.message,
		    })
		});
}

function getAllReviews(req, res) {
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
	    .catch(function(err) {
	      res.status(500)
	        .json({
	          status: 'fail',
	          time: new Date(),
	          message: 'Failed to get reviews',
	        })
	    });
}


function deleteByUserId(userid){
	db.none('delete from users where userid = $1', userid)
          	.then(function() {
          		return 'success';
          	})
          	.catch(function(error) {
          		console.log("row 130" + error.message);
          	})
}

module.exports = {
	getAllUsers: getAllUsers,
	createUser: createUser,
	login: login,
	userNameAvailable: userNameAvailable,
	deleteUser: deleteUser,
	saveReview: saveReview,
	getAllReviews: getAllReviews,
  testToken: testToken
}
