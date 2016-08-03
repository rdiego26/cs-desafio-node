const request = require('supertest'),
    path = require('path'),
    userDao = require(path.resolve('src/dao/user')),
    userPhoneDao = require(path.resolve('src/dao/userPhone')),
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

  afterEach(function(done) {

    userPhoneDao.deleteOne({phone: _validUser.phones[0].phone}).then(function() {
      userDao.deleteOne({email: _validUser.email}).then(function() {
        done();
      }).catch();
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

            assert.isArray(_createdUser.phones);
            assert.equal(1, _createdUser.phones.length);

            assert.ok(_validUser.cpf === _createdUser.cpf);
            done();
          }

        });

  });

});
