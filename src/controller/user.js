const path = require('path');
const R = require('ramda');
const UUID = require('node-uuid');
const constants = require(path.resolve('src/util/constants'));
const userDao = require(path.resolve('src/dao/user'));
const userPhoneDao = require(path.resolve('src/dao/userPhone'));
const userSessionDao = require(path.resolve('src/dao/session'));

const userController = {

  create: function(req, res) {
    const _user = req.body;

    userDao.create(_user).then(function(createdUser) {

      var _finalUser =  createdUser.toJSON();

      if (_user.phones) {
        var _phone = _user.phones[0];
        userPhoneDao.create({phone: _phone.phone, ddd: _phone.ddd, userId: createdUser.id}).then(function(_createdPhone) {

          userSessionDao.create({userId: createdUser.id, token: UUID.v1()}).then(function(_createdSession) {

            _finalUser.token = _createdSession.token;
            _finalUser.time = _createdSession.time;

            userPhoneDao.find({userId: createdUser.id}).then(function(_phones) {
              _finalUser.phones = _phones;
              res.status(200).json(_finalUser);
            });

          });

        });
      } else {
        res.status(200).json(_finalUser);
      }

    }).catch(function(error) {

      var _message = constants.message.DEFAULT_ERROR;

      if(R.contains('email', R.pluck('path', error.errors))) {
        _message = constants.message.ALREADY_MAIL;
      }

      res.status(500).json(_message);
    });

  },

  getAll: function(req, res) {
    const filter = { };

    userDao.find(filter).then(function(users) {
      res.status(200).json(users);
    }).catch(function(error) {
      res.status(500).end(JSON.stringify(error));
    });
  },

  get: function(req, res) {
    const filter = {
      cpf: req.params.cpf || 0
    };

    userDao.findOne(filter).then(function(user) {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).end();
      }
    }).catch(function(error) {
      res.status(500).end(JSON.stringify(error));
    });
  },

  update: function(req, res) {
    const filter = {
      id: req.params.id || 0
    };
    const user = req.body;

    userDao.update(user, filter).then(function() {
      res.status(200).end();
    }).catch(function(error) {
      res.status(500).end(JSON.stringify(error));
    });
  }

};

module.exports = userController;
