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

  afterEach(function() {
    userDao.findOne({email: _validUser.email}).then(function(_userFetched) {

      if(_userFetched) {

        sessionDao.deleteOne({userId: _userFetched.id}).then(function() {
            userDao.deleteOne({email: _validUser.email}).then(function() {
              return;
            }).catch();

        });

      }

    });

  });


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

          done();

        });


      });

    });

  });

});
