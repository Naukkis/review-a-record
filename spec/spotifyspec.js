describe('Spotify functions', function() {
    var spotify = require('../spotify');
    var Request = require('request');
    var server;

    beforeAll(() => {
        server = require('../server');
    });

    describe('it should receive Spotify access token', () => {
        let data = {};
        beforeAll((done) => {
          Request.get('http://localhost:3002/spotify/access-token',
                      (error, response, body) => {
                          data.status = response.statusCode;
                          data.body = JSON.parse(body);
                          done();
                      });
          });
          it('should respond Status 200', () => {
              expect(data.status).toBe(200);
          });
          it('Should tell to have retrieved new token', () => {
              expect(data.body.message).toBe('Retrieved new token');
          });
          it('Should get a spotify access token', () => {
              expect(data.body.access_token.length).toBeGreaterThan(20);
          });
    });
});