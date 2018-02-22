var express = require('express');
var db = require('./queries');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.use(function(req, res, next) {
  var token = req.body.token || req.headers['token'];

  if(token) {
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(err) {
        res.status(401).send("Invalid token");
      } else {
        next();
      }
    })
  } else {
    res.send("please send token");
  }
})


router.post('/reviews/save-review', db.saveReview);
router.post('/reviews/delete-review', db.deleteReview);
router.post('/users/delete-user', db.deleteUser);
//router.get('/users/get-all-users', db.getAllUsers);

module.exports = router;
