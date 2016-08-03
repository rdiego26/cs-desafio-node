const path = require('path'),
    assert = require('chai').assert,
    R = require('ramda'),
    UUID = require('node-uuid'),
    userDao = require(path.resolve('src/dao/user')),
    sessionDao = require(path.resolve('src/dao/session'));

describe('Session Spec', function() {

  const _validUser = {
    name: "User",
    email: "email@email.com",
    password: "12345"
  };


  it('not should create session with invalid user', function(done) {
    var _session = {
      token: UUID.v1()
    };

    sessionDao.create(_session).then(function() {
    }).catch(function() {
      done();
    });
  });

  it('should create valid session and find then with find function', function(done) {

    var _session = {
      token: UUID.v1()
    };
    userDao.create(_validUser).then(function(_createdUser) {

      _session.userId = _createdUser.id;

      sessionDao.create(_session).then(function(_createdSession) {

        sessionDao.find({token: _createdSession.token}).then(function(_fetchedSessions) {

          assert.isArray(_fetchedSessions);
          assert.ok(1, _fetchedSessions.length);

          sessionDao.deleteOne({userId: _createdUser.id}).then(function() {

            userDao.deleteOne({id: _createdUser.id}).then(function() {
              done();
            });

          });

        });

      });

    });

  });

  it('should create valid session and find then with findLast function', function(done) {

    var _session = {
      token: UUID.v1()
    };
    userDao.create(_validUser).then(function(_createdUser) {

      _session.userId = _createdUser.id;

      sessionDao.create(_session).then(function(_createdSession) {

        sessionDao.findLast({userId: _createdUser.id}).then(function(_fetchedSession) {

          sessionDao.deleteOne({userId: _createdUser.id}).then(function() {

            userDao.deleteOne({id: _createdUser.id}).then(function() {
              done();
            });

          });

        });


      });

    });

  });

});
