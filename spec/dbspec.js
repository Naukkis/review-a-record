/* 
* Integration tests to test all database related API-endpoints with test database.
*/

describe('DBqueries', function () {
  // Start server to run tests on
  var server;
  beforeAll(() => {
    server = require('../server/server');
  });

  // request module to perform http-requests
  var Request = require('request');

  // token to be received after login for admin and regular user
  var token = '';
  var regularToken = '';
  
  // save userID for created users
  var userID;
  var regularUserID;

  // save review id for review made in tests, so we can search/modify/delete the review later
  var reviewid;

  // test environment database address
  var dbURL = 'http://localhost:3002/';

  describe('Create admin user', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'users/create-user',
        form: { 'username': 'jasmineTestUser', 'password': 'asdfg', 'email': 'mail@mail.com', 'firstname': 'etunimi', 'lastname': 'sukunimi', 'admin': 'true' }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should greate one user', () => {
      expect(data.body.message).toBe('created new user');
    });
  });

  describe('Create regular user', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'users/create-user',
        form: { 'username': 'jasmineRegularTestUser', 'password': 'asdfg', 'email': 'testmail@mail.com', 'firstname': 'etunimi', 'lastname': 'sukunimi', 'admin': 'true' }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should greate one user', () => {
      expect(data.body.message).toBe('created new user');
    });
  });

  // test if error handling on creating user is workin as expected with empty from
  describe('Create user error handling', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'users/create-user',
        form: {}
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(404);
    });
    it('should respond Status 200', () => {
      expect(data.body.status).toBe('error');
    });
  });

  describe('Login admin user', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'login',
        form: { 'username': 'jasmineTestUser', 'password': 'asdfg' }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          token = data.body.token;
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should be able to login', () => {
      expect(data.body.message).toBe('login successful');
    });

    it('Shoud receive a token', () => {
      expect(data.body.token).toBeTruthy();
    })

    it('Should receive userID', () => {
      expect(data.body.userid).toBeTruthy();
      userID = data.body.userid;
    })
  });

  describe('Login regular user', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'login',
        form: { 'username': 'jasmineRegularTestUser', 'password': 'asdfg' }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          regularToken = data.body.token;
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should be able to login', () => {
      expect(data.body.message).toBe('login successful');
    });

    it('Shoud receive a token', () => {
      expect(data.body.token).toBeTruthy();
    })

    it('Should receive userID', () => {
      expect(data.body.userid).toBeTruthy();
      regularUserID = data.body.userid;
    })
  });

  describe('it should validate token', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'test-token',
        form: { 'token': token }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });

    it('Shoud receive validation', () => {
      expect(data.body.data).toBe(true);
    });

    it('Should return correct userID', () => {
      expect(data.body.userid).toBe(userID);
    });
  });

  describe('it should response with error to invalid token', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'test-token',
        form: { 'token': 'invalidtoken' }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 404', () => {
      expect(data.status).toBe(404);
    });
  });

  describe('Username not available', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'users/user-name-available/jasmineTestUser',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
    });

    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });

    it('Should not be available', () => {
      expect(data.body).toBe('false');
    });
  });

  describe('Get user ID', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'users/get-userid/jasmineTestUser',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });

    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive correct user ID', () => {
      expect(data.body.userid).toBe(userID);
    });
  });

  describe('Get all users', () => {
    var data = {};
    beforeAll((done) => {
      Request.get({url: dbURL + 'secure/users/all', headers: { 'token': token } },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          console.log(data.body);
          done();
        });
    });

    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive all users', () => {
      expect(data.body.all_users.length).toBeGreaterThan(2);
    });
  });
  

  describe('Username available', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'users/user-name-available/dumdumddum',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        });
    });

    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should be available', () => {
      expect(data.body).toBe('true');
    });
  });


  describe('Write a review', () => {
    let data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'secure/reviews/save-review',
        form: {
          'user_id': userID, 'artist_name': 'Metallica',
          'album_name': 'ride',
          'spotify_artist_id': '2ye2Wgw4gimLv2eAKyk1NB',
          'spotify_album_id': '5rFZcoCvmCaJ1gxTMU4JTm',
          'review_text': 'jeejee jee',
          'token': token
        }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          reviewid = data.body.reviewid;
          done();
        });
    });

    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });

    it('Should save the review', () => {
      expect(data.body.message).toBe('saved new review');
    });
  })

  describe('Get all reviews by artist', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'reviews/artist/2ye2Wgw4gimLv2eAKyk1NB',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {

      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('received all reviews by artist');
    });
    it('Should contain review data', () => {
      expect(data.body.data[0].review_text).toBeTruthy();
    })
  });

  describe('Get all reviews by album', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'reviews/album/5rFZcoCvmCaJ1gxTMU4JTm',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {

      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('received all reviews by album');
    });
    it('Should contain review data', () => {
      expect(data.body.data[0].review_text).toBeTruthy();
    })
  });

  describe('Edit a review', () => {
    let data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'secure/reviews/edit-review',
        form: {
          'user_id': userID,
          'review_text': 'jeejee edited',
          'reviewid': reviewid,
          'token': token
        }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('review with id ' + reviewid +  ' edited');
    });
  })

  describe('Get all reviews by user', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'reviews/' + userID,
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('received all reviews by user');
    });
    it('Should contain review data', () => {
      expect(data.body.data[0].review_text).toBeTruthy();
    })
  });

  describe('Rate album by admin user', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({ 
        url: dbURL + 'secure/reviews/rate-album',
        form: { 'user_id': userID, 'spotify_album_id': '5rFZcoCvmCaJ1gxTMU4JTm', 'token': token, 'rating': 4 }},
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should rate album', () => {
      expect(data.body.message).toBe('rated album');
    });
  });

  describe('Rate album by regular user', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({ 
        url: dbURL + 'secure/reviews/rate-album',
        form: { 'user_id': regularUserID, 'spotify_album_id': '5rFZcoCvmCaJ1gxTMU4JTm', 'token': regularToken, 'rating': 5 }},
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should rate album', () => {
      expect(data.body.message).toBe('rated album');
    });
  });

  describe('Get album rating', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'reviews/album-rating/5rFZcoCvmCaJ1gxTMU4JTm',
      (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('album rating fetched');
    });
    it('Should contain review data', () => {
      expect(data.body.ratingAverage).toBe(4.5);
    });
  });

  describe('Get latest reviews', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'reviews/latest',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('received latest 20 reviews');
    });
    it('Should contain review data', () => {
      expect(data.body.data[0].review_text).toBeTruthy();
    })
  });


  describe('Get all reviews', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'reviews/get-all-reviews',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('Retrieved ALL reviews');
    });
    it('Should contain review data', () => {
      expect(data.body.data[0].review_text).toBeTruthy();
    })
  });

  describe('Remove review', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'secure/reviews/delete-review',
        form: { 'user_id': userID, 'reviewid': reviewid, 'token': token }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should be able to delete review', () => {
      expect(data.body.message).toBe('review deleted');
    });
  });

  // test empty results
  describe('no reviews for artist', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'reviews/artist/2ye2Wgw4gimLv2eAKyk1NB',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('No reviews found');
    });

  });

  describe('latest reviews empty', () => {
    var data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'reviews/latest',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should receive reviews', () => {
      expect(data.body.message).toBe('No reviews found');
    });
  });

  describe('check admin status', () => {
    let data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'admin-status/' + userID,
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          data.headers = response.headers;
          console.log(data.admin);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    
    it('should respond with admin status', () => {
      expect(data.body.admin).toBe(true);
    });
  })

  describe('Delete regular user', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'secure/users/delete-user',
        form: { 'username': 'jasmineTestUser',
        'password': 'asdfg',
        'token': token,
        'user_to_delete': regularUserID
      }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should be able to delete user', () => {
      expect(data.body.message).toBe(`user ${regularUserID} deleted`);
    });
  });

  describe('Delete admin', () => {
    var data = {};
    beforeAll((done) => {
      Request.post({
        url: dbURL + 'secure/users/delete-user',
        form: { 'username': 'jasmineTestUser',
        'password': 'asdfg',
        'token': token,
        'user_to_delete': userID
      }
      },
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = JSON.parse(body);
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Should be able to delete user', () => {
      expect(data.body.message).toBe(`user ${userID} deleted`);
    });
  });

  describe('receive music player', () => {
    let data = {};
    beforeAll((done) => {
      Request.get(dbURL + 'spotify/player',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = response.body;
          data.headers = response.headers;
          done();
        });
    });
    it('should respond Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('should respond with correct content-type', () => {
      expect(data.headers['content-type']).toBe('text/html; charset=UTF-8');
    });
  });

});
