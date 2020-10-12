const { UserGroup } = require('../models');

const predefinedUsersGroups = [];

const seed = () => {
  return UserGroup.sync({ force: true }).then(() => {
    return UserGroup.bulkCreate(predefinedUsersGroups);
  });
};

module.exports = seed;
