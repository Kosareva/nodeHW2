const { Group } = require('../models');
const { permissions } = require('../../../models/group');
const adminPermissions = permissions.asArray();
const customerPermissions = [
  permissions.enum.READ,
  permissions.enum.SHARE,
  permissions.enum.UPLOAD_FILES
];

const predefinedGroups = [
  {
    name: 'admin',
    permissions: adminPermissions
  },
  {
    name: 'customer',
    permissions: customerPermissions
  }
];

const seed = () => {
  return Group.sync({ force: true }).then(() => {
    return Group.bulkCreate(predefinedGroups);
  });
};

module.exports = seed;
