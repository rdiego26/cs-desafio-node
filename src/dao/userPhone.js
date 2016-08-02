const path = require('path'),
    R = require('ramda'),
    userPhoneModel = require(path.resolve('src/model/userPhone')),
    sequelize = require(path.resolve('src/util/sequelize-connection')),
    constants = require(path.resolve('src/util/constants'));

var dao = {

  create: function(client) {
    return userPhoneModel.create(client);
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
  },

  update: function(newObject, filter) {

    newObject = R.omit(['id', 'userId'], newObject);

    return userPhoneModel.update(newObject,
        {
          where: filter
        }
    );
  }

};

module.exports = dao;

