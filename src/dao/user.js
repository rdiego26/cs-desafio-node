const path = require('path'),
    R = require('ramda'),
    userModel = require(path.resolve('src/model/user')),
    sequelize = require(path.resolve('src/util/sequelize-connection')),
    constants = require(path.resolve('src/util/constants'));

var dao = {

  create: function(user) {
    return userModel.create(user);
  },

  deleteOne: function(query) {
    return userModel.destroy({where: query});
  },

  find: function(query) {
    query = query || {};

    return userModel.findAll({
      where: query
    });
  },

  findOne: function(query) {
    query = query || {};

    return userModel.findOne({
      where: query
    });
  },

  update: function(newObject, filter) {

    newObject = R.omit(['id'], newObject);

    return userModel.update(newObject,
        {
          where: filter
        }
    );
  }

};

module.exports = dao;
