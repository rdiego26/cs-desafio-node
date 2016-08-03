const path = require('path');
const R = require('ramda');
const UUID = require('node-uuid');
const md5 = require('md5');
const moment = require('moment');
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

      if (R.contains('email', R.pluck('path', error.errors))) {
        _message = constants.message.ALREADY_MAIL;
      }

      res.status(500).json(_message);
    });

  },

  signin: function(req, res) {

    const _userData = req.body;


    userDao.findOne({email: _userData.email}).then(function(_userFetched) {

      if (_userFetched) {

        userDao.findOne({email: _userData.email, password: md5(_userData.password)}).then(function(_userFullyFetched) {

          if (_userFullyFetched) {

            var _finalUser =  _userFullyFetched.toJSON();

            userSessionDao.create({userId: _userFullyFetched.id, token: UUID.v1()}).then(function(_createdSession) {

              _finalUser.token = _createdSession.token;
              _finalUser.time = _createdSession.time;

              userPhoneDao.find({userId: _userFullyFetched.id}).then(function(_phones) {
                _finalUser.phones = _phones;
                res.status(200).json(_finalUser);
              });

            });

          } else {
            res.status(401).json(constants.message.INVALID_SIGNIN_DATA);
          }

        });

      } else {
        res.status(400).json(constants.message.INVALID_SIGNIN_DATA);
      }

    });

  },

  get: function(req, res) {
    const filter = {
      id: req.params.id || 0
    };
    const _userId = req.params.id || filter.id;
    const _token = req.token;

    userSessionDao.findLast({token: _token}).then(function(_fetchedLastSession) {

      if (_fetchedLastSession) {
        userSessionDao.findLast({token: _token, userId: _userId}).then(function(_fetchedSession) {

          if (_fetchedSession) {
            var _now = moment();
            var _tokenHour = moment(_fetchedSession.time);
            var _difference = _now.diff(_tokenHour, 'hours');

            if (_difference > 30) {
              res.status(401).json(constants.message.INVALID_SESSION);
            } else {

              userDao.findOne({id: _userId}).then(function(_fetchedUser) {
                res.status(200).json(_fetchedUser);
              });

            }
          } else {
            res.status(401).json(constants.message.NOT_AUTHORIZED);
          }

        });
      } else {
        res.status(400).json(constants.message.NOT_AUTHORIZED);
      }

    });

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
