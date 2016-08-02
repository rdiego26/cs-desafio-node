const path = require('path'),
    sequelize = require(path.resolve('src/util/sequelize-connection')),
    Sequelize = require('sequelize');

const userPhone = sequelize.define('userPhone', {

  id: {
    type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
  },
  userId: {
    type: Sequelize.UUID, allowNull: false, field: 'user_id',
    references: {
      model: 'user',
      key: 'id'
    }
  },
  phone: {
    type: Sequelize.STRING(9), allowNull: false
  },
  ddd: {
    type: Sequelize.STRING(2), allowNull: false
  }
},
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    tableName: 'user_phone'
  }
);

module.exports = userPhone;