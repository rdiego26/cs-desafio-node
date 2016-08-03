const request = require('supertest'),
    path = require('path'),
    app = require(path.resolve('src/routes'));

describe('Exceptions API', function() {

  it('gets 404 when access nonexistent route', function(done) {

    request(app)
        .get('/api/nonexistent')
        .expect(404, done);

  });

});

