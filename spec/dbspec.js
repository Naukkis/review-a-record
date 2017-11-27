describe('DBqueries', function() {
    var db = require('../queries');
    var Request = require('request');
    var server;
    beforeAll(() => {
        server = require('../server');
    });

    describe('GET all users/', () => {
    var data = {};
    beforeAll((done) => {
        Request.get('http://localhost:3002/test', (error, response, body) => {
            data.status = response.statusCode;
            data.body = JSON.parse(body);
            done();
            });
        });
        it('should respond Status 200', () => {
            expect(data.status).toBe(200);
        });
        it('Should get all users', () => {
            expect(data.body.status).toBe('success');
        });
    });
});