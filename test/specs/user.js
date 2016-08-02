const path = require('path'),
    assert = require('chai').assert,
    R = require('ramda'),
    userDao = require(path.resolve('src/dao/user'));

describe('User Spec', function() {

  const _validUser = {
    name: "User",
    email: "email@email.com",
    password: "12345"
  };

  before(function() {
    userDao.deleteOne({email: _validUser.email}).then(function() {
      return;
    }).catch(function(err) {
      console.error(err);
    });
  });

  afterEach(function() {
    userDao.deleteOne({email: _validUser.email}).then(function() {
      return;
    }).catch(function(err) {
      console.error(err);
    });
  });


  it('not should create user passing blank email', function(done) {
    var _user = R.clone(_validUser);
    delete _user.email;

    userDao.create(_user).then(function() {
    }).catch(function() {
      done();
    });
  });

  it('not should create user passing blank password', function(done) {
    var _user = R.clone(_validUser);
    delete _user.password;

    userDao.create(_user).then(function() {
    }).catch(function() {
      done();
    });
  });

  it('should create valid user', function(done) {
    var _user = _validUser;
    userDao.create(_user).then(function() {
      userDao.deleteOne({email: _user.email}).then(function() {
        done();
      });
    });
  });

  it('should create valid user and find then with find function', function(done) {
    var _user = _validUser;

    userDao.create(_user).then(function() {

      userDao.find({email: _user.email}).then(function(fetchedUsers) {
        assert.ok(Array.isArray(fetchedUsers));
        assert.equal(1, fetchedUsers.length);
        assert.ok(fetchedUsers[0].email === _user.email);
        done();
      });

    });
  });

  it('should create valid user and find then with findOne function', function(done) {
    var _user = _validUser;

    userDao.create(_user).then(function() {

      userDao.findOne({email: _user.email}).then(function(fetchedUser) {
        assert.isObject(fetchedUser);
        assert.ok(fetchedUser.email === _user.email);
        done();
      });

    });
  });

});