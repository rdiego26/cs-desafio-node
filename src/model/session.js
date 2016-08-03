const path = require('path'),
    sequelize = require(path.resolve('src/util/sequelize-connection')),
    Sequelize = require('sequelize');

const session = sequelize.define('session', {

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
      token: {
        type: Sequelize.UUID, allowNull: false
      },
      time: {
        type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW
      }
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
      tableName: 'session'
    }
);

module.exports = session;
