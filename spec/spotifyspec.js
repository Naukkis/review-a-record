describe('Spotify functions', function () {
  var Request = require('request');
  var server;

  beforeAll(() => {
    server = require('../server/server');
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

  describe('it should redirect to Spotify login', () => {
    let data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3002/spotify/auth',
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
      expect(data.headers['content-type']).toBe('text/html;charset=utf-8');
    });

  })
});