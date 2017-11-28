describe('DBqueries', function() {
    var db = require('../queries');
    var Request = require('request');
    var server;
    beforeAll(() => {
        server = require('../server');
    });

    describe('Create user', () => {
    var data = {};
    beforeAll((done) => {
        Request.post({url:'http://localhost:3002/database/create-user',
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
        Request.get('http://localhost:3002/database/get-all-users', (error, response, body) => {
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
	                          done();
	                    });
        });
        it('should respond Status 200', () => {
            expect(data.status).toBe(200);
        });
        it('Should be able to login', () => {
            expect(data.body.message).toBe('login successful');
        });
    });

    describe('Username available', () => {
    	var data = {};
    	beforeAll((done) => {
	        Request.post({url:'http://localhost:3002/database/user-name-available',
	                    form: {'username': 'jasmineTestUser' }},
	                    (error, response, body) => {
	                          data.status = response.statusCode;
	                          data.body = body;
	                          done();
	                    });
        });

        it('should respond Status 200', () => {
            expect(data.status).toBe(200);
        });
        it('Should be able to login', () => {
            expect(data.body).toBe('false');
        });
    });


    describe('Username available', () => {
    	var data = {};
    	beforeAll((done) => {
	        Request.post({url:'http://localhost:3002/database/user-name-available',
	                    form: {'username': 'ennooOlemas' }},
	                    (error, response, body) => {
	                          data.status = response.statusCode;
	                          data.body = body;
	                          done();
	                    });
        });

        it('should respond Status 200', () => {
            expect(data.status).toBe(200);
        });
        it('Should be able to login', () => {
            expect(data.body).toBe('true');
        });
    });

    describe('Remove user', () => {
    	var data = {};
    	beforeAll((done) => {
	        Request.post({url:'http://localhost:3002/database/delete-user',
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
});
