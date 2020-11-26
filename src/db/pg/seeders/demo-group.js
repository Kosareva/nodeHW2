const { Group } = require('../models');
const { permissions } = require('../../../models/group');
const adminPermissions = permissions.asArray();
const customerPermissions = [
  permissions.enum.READ,
  permissions.enum.SHARE,
  permissions.enum.UPLOAD_FILES
];

const groups = [
  {
    name: 'admin',
    permissions: adminPermissions
  },
  {
    name: 'customer',
    permissions: customerPermissions
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Group.sync({ force: true });
    await Group.bulkCreate(groups);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Groups', null);
  }
};
