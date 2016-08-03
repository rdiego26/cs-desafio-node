const path = require('path'),
    R = require('ramda'),
    userPhoneModel = require(path.resolve('src/model/userPhone')),
    sequelize = require(path.resolve('src/util/sequelize-connection')),
    constants = require(path.resolve('src/util/constants'));

var dao = {

  create: function(phone) {
    return userPhoneModel.create(phone);
  },

  deleteOne: function(query) {
    return userPhoneModel.destroy({where: query});
  },

  find: function(query) {
    query = query || {};

    return userPhoneModel.findAll({
      where: query
    });
  },

  findOne: function(query) {
    query = query || {};

    return userPhoneModel.findOne({
      where: query
    });
  }

};

module.exports = dao;

