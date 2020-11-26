'use strict';

const { permissions } = require('../../../models/group');
const { containsOnly } = require('../../../utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        unique: {
          msg: 'This group is already exists'
        }
      },
      permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        validate: {
          isValidPermissions: function (value) {
            return containsOnly(value, permissions.asArray());
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Groups');
  }
};
