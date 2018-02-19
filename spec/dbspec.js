describe('DBqueries', function() {
    var db = require('../queries');
    var Request = require('request');
    var server;
    var token = '';
    var userID;

    beforeAll(() => {
        server = require('../server');
    });

    describe('Create user', () => {
    var data = {};
    beforeAll((done) => {
        Request.post({url:'http://localhost:3002/users/create-user',
                    form: {'username': 'jasmineTestUser', 'password': 'asdfg', 'email': 'mail@mail.com', 'firstname': 'etunimi', 'lastname': 'sukunimi'}},
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

    describe('Login user', () => {
    	var data = {};
    	beforeAll((done) => {
	        Request.post({url:'http://localhost:3002/login',
	                    form: {'username': 'jasmineTestUser', 'password': 'asdfg'}},
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

    describe('Username not available', () => {
    	var data = {};
    	beforeAll((done) => {
	        Request.get('http://localhost:3002/users/user-name-available/jasmineTestUser',
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


    describe('Username available', () => {
    	var data = {};
    	beforeAll((done) => {
            Request.get('http://localhost:3002/users/user-name-available/dumdumddum',
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
            Request.post({url:'http://localhost:3002/secure/reviews/save-review',
                        form: {'user_id': userID, 'artist_name': 'Metallica',
                               'album_name': 'ride',
                               'spotify_artist_id': '2ye2Wgw4gimLv2eAKyk1NB',
                               'spotify_album_id': '5rFZcoCvmCaJ1gxTMU4JTm',
                               'review_text': 'jeejee jee',
                               'token': token
                           }},
                        (error, response, body) => {
                            data.status = response.statusCode;
                            data.body = JSON.parse(body);
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
        Request.get('http://localhost:3002/reviews/artist/2ye2Wgw4gimLv2eAKyk1NB',
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
        Request.get('http://localhost:3002/reviews/album/5rFZcoCvmCaJ1gxTMU4JTm',
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

    describe('Get all reviews by user', () => {
        var data = {};
        beforeAll((done) => {
        Request.get('http://localhost:3002/reviews/' + userID,
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

        describe('Remove review', () => {
        var data = {};
        beforeAll((done) => {
            Request.post({url:'http://localhost:3002/secure/reviews/delete-review',
                        form: {'user_id': userID, 'spotify_album_id': '5rFZcoCvmCaJ1gxTMU4JTm', 'token': token}},
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


    describe('Delete user', () => {
        var data = {};
        beforeAll((done) => {
            Request.post({url:'http://localhost:3002/secure/users/delete-user',
                        form: {'username': 'jasmineTestUser', 'password': 'asdfg', 'token': token}},
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
            expect(data.body.message).toBe('user deleted');
        });
    });
});
