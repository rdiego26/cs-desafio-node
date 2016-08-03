const request = require('supertest'),
    path = require('path'),
    userDao = require(path.resolve('src/dao/user')),
    userPhoneDao = require(path.resolve('src/dao/userPhone')),
    userSessionDao = require(path.resolve('src/dao/session')),
    assert = require('chai').assert,
    R = require('ramda'),
    app = require(path.resolve('src/routes'));

describe('User API', function() {

  const _validUser = {
    name: "User",
    email: "email@email.com",
    password: "12345",
    phones: [{phone: '123456789', ddd: '21'}]
  };

  const _signinData = {
    email: "email@email.com",
    password: "12345"
  };

  afterEach(function(done) {

    userDao.findOne({email: _validUser.email}).then(function(_userFetched) {

      if(_userFetched) {

        userSessionDao.deleteOne({userId: _userFetched.id}).then(function() {

          userPhoneDao.deleteOne({phone: _validUser.phones[0].phone}).then(function() {
            userDao.deleteOne({email: _validUser.email}).then(function() {
              done();
            }).catch();
          });

        });

      }

    });

  });

  it('should create valid user and returns user created', function(done) {

    request(app)
        .post('/api/user')
        .send(_validUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {

          if(!err) {
            var _createdUser = res.body;

            assert.ok(_validUser.email === _createdUser.email);
            done();

          }

        });

  });

  it('should signin returns user created', function(done) {


    request(app)
        .post('/api/user')
        .send(_validUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {

          request(app)
              .post('/api/user/signin')
              .send(_signinData)
              .expect('Content-Type', /json/)
              .expect(200)
              .end(function(err, res) {

                if(!err) {
                  var _createdUser = res.body;

                  assert.ok(_signinData.email === _createdUser.email);
                  assert.property(_createdUser, 'token');

                  done();

                }

              });

        });



  });

  it('should search user with token', function(done) {

    request(app)
        .post('/api/user')
        .send(_validUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {

          if (!err) {

            var _createdUser = res.body;

            request(app)
                .get('/api/user/' + _createdUser.id)
                .expect('Content-Type', /json/)
                .set('Authorization', _createdUser.token)
                .expect(200)
                .end(function(err, res) {

                  if(!err) {
                    var _fetchedUser = res.body;

                    assert.ok(_fetchedUser.token === _createdUser.token);
                    assert.property(_fetchedUser, 'token');

                    done();

                  }
                });
          }

        });

  });

});
