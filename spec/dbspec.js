describe('DBqueries', function() {
    var db = require('../queries');
    var Request = require('request');
    var server;
    var token = '';
    beforeAll(() => {
        server = require('../server');
    });

    describe('Create user', () => {
    var data = {};
    beforeAll((done) => {
        Request.post({url:'http://localhost:3002/users/create-user',
                    form: {'username': 'jasmineTestUser', 'password': 'asdfg'}},
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

    describe('GET all users/', () => {
    var data = {};
    beforeAll((done) => {
        Request.get('http://localhost:3002/users/get-all-users', (error, response, body) => {
            data.status = response.statusCode;
            data.body = JSON.parse(body);
            done();
            });
        });
        it('should respond Status 200', () => {
            expect(data.status).toBe(200);
        });
        it('Should get all users', () => {
            expect(data.body.message).toBe('Retrieved ALL users');
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
    });

    describe('Username', () => {
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


    describe('Username', () => {
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

    describe('Secure get-all-users', () => {
    	var data = {};
    	beforeAll((done) => {
	        Request.get({url:'http://localhost:3002/secure/users/get-all-users',
	                    headers: {'token': token}},
	                    (error, response, body) => {
	                        data.status = response.statusCode;
	                        data.body = JSON.parse(body);
	                        done();
	                    });
        });

        it('should respond Status 200', () => {
            expect(data.status).toBe(200);
        });
        it('Should receive all users', () => {
            expect(data.body.message).toBe('Retrieved ALL users');
        });
    })


    describe('Remove user', () => {
    	var data = {};
    	beforeAll((done) => {
	        Request.post({url:'http://localhost:3002/users/delete-user',
	                    form: {'username': 'jasmineTestUser', 'password': 'asdfg'}},
	                    (error, response, body) => {
	                        data.status = response.statusCode;
	                        data.body = JSON.parse(body);
	                        done();
	                    });
        });
        it('should respond Status 200', () => {
            expect(data.status).toBe(200);
        });
        it('Should be able to remove user', () => {
            expect(data.body.message).toBe('user deleted');
        });
    });

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
        Request.get('http://localhost:3002/reviews/1',
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

});
