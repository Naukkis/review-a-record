const db = require('./db');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);


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
  var psw = bcrypt.hashSync(req.body.password, salt);
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
  var submittedPsw = req.body.password;
  db.one('select * from users where username = $1', [req.body.username])
    .then(function(data) {
        var verified = bcrypt.compareSync(submittedPsw, data.password);

        if (verified){
          delete data.password;
          res.status(200)
          	 .json({
	            username: req.body.username,
	            token: 'leikkitoken',
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

module.exports = {
	getAllUsers: getAllUsers,
	createUser: createUser,
	login: login,
	userNameAvailable: userNameAvailable
}