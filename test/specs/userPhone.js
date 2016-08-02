const path = require('path'),
    assert = require('chai').assert,
    R = require('ramda'),
    userDao = require(path.resolve('src/dao/user')),
    userPhoneDao = require(path.resolve('src/dao/userPhone'));

describe('User Phone Spec', function() {

  const _validUser = {
    name: "User",
    email: "email@email.com",
    password: "12345"
  };

  before(function() {

    userDao.find({email: _validUser.email}).then(function(_fetchedUser) {

      if(_fetchedUser !== undefined) {

        userPhoneDao.deleteOne({ userId: _fetchedUser.id }).then(function() {

          userDao.deleteOne({email: _fetchedUser.email}).then(function() {
            return;
          }).catch(function(err) {
            console.error(err);
          });

        });

      }

    });

  });

  it('not should create phone without user', function(done) {
    var _phone = {
      phone: '123456789',
      ddd: '21'
    };

    userPhoneDao.create(_phone).then(function() {
    }).catch(function() {
      done();
    });
  });

  it('should create phones with valid user', function(done) {
    const _user = R.clone(_validUser);

    var _phone = {
      phone: '123456789',
      ddd: '21'
    };

    userDao.create(_user).then(function(_createdUser) {

      _phone.userId = _createdUser.id;

      userPhoneDao.create(_phone).then(function(_createdPhone) {

        assert.ok(_createdPhone !== undefined);

        userPhoneDao.deleteOne({userId: _createdPhone.userId}).then(function() {

          userDao.deleteOne({id: _createdUser.id}).then(function() {
            done();
          });

        });

      });

    });

  });

  it('should create phones and find phones with find function', function(done) {
    const _user = R.clone(_validUser);

    var _phone = {
      phone: '123456789',
      ddd: '21'
    };

    userDao.create(_user).then(function(_createdUser) {

      _phone.userId = _createdUser.id;

      userPhoneDao.create(_phone).then(function(_createdPhone) {

        assert.ok(_createdPhone !== undefined);

        userPhoneDao.find({userId: _createdPhone.userId}).then(function(_fetchedPhones) {

          assert.isArray(_fetchedPhones);
          assert.equal(1, _fetchedPhones.length);
          assert.ok(_fetchedPhones[0].phone === _phone.phone);

          userPhoneDao.deleteOne({userId: _createdPhone.userId}).then(function() {

            userDao.deleteOne({id: _createdUser.id}).then(function() {
              done();
            });

          });


        });


      });

    });

  });

  it('should find specific phone', function(done) {
    const _user = R.clone(_validUser);

    var _phone = {
      phone: '123456789',
      ddd: '21'
    };

    userDao.create(_user).then(function(_createdUser) {

      _phone.userId = _createdUser.id;

      userPhoneDao.create(_phone).then(function(_createdPhone) {

        assert.ok(_createdPhone !== undefined);

        userPhoneDao.findOne({phone: _createdPhone.phone}).then(function(_fetchedPhone) {

          assert.ok(_fetchedPhone.phone === _phone.phone);

          userPhoneDao.deleteOne({userId: _createdPhone.userId}).then(function() {

            userDao.deleteOne({id: _createdUser.id}).then(function() {
              done();
            });

          });


        });


      });

    });

  });

});
