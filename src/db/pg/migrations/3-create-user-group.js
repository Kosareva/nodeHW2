'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserGroup', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        unique: true
      },
      groupId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Groups'
          },
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserGroup');
  }
};
