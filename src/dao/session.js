const path = require('path'),
    R = require('ramda'),
    sessionModel = require(path.resolve('src/model/session')),
    sequelize = require(path.resolve('src/util/sequelize-connection')),
    constants = require(path.resolve('src/util/constants'));

var dao = {

  create: function(session) {
    return sessionModel.create(session);
  },

  deleteOne: function(query) {
    return sessionModel.destroy({where: query});
  },

  findLast: function(query) {
    query = query || {};

    return sessionModel.findOne({
      order: ['time', 'DESC'],
      limit: 1,
      where: query
    });
  },

  find: function(query) {
    query = query || {};

    return sessionModel.findAll({
      where: query
    });
  }

};

module.exports = dao;

