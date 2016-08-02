const path = require('path'),
    sequelize = require(path.resolve('src/util/sequelize-connection')),
    userPhoneModel = require(path.resolve('src/model/userPhone')),
    md5 = require('md5'),
    Sequelize = require('sequelize');

const user = sequelize.define('user', {

  id: {
    type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1
  },
  name: {
    type: Sequelize.STRING(50), allowNull: false
  },
  email: {
    type: Sequelize.STRING(100), allowNull: false, unique: true
  },
  password: {
    type: Sequelize.TEXT, allowNull: false,
    set: function(val) {
      this.setDataValue('password', md5(val));
    }
  },
  registerDate: {
    type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW, field: 'register_date'
  },
  lastUpdate: {
    type: Sequelize.DATE, field: 'last_update'
  }
},
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    tableName: 'user'
  }
);

user.hasMany(userPhoneModel, {as: 'phones'});

module.exports = user;