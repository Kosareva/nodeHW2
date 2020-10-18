const { UserGroup } = require('../../../db/pg/models');

async function addUsersToGroup(groupId, userIds) {
  const records = userIds.map(userId => ({
    groupId,
    userId
  }));
  return UserGroup.bulkCreate(records);
}

async function findUserGroups(userId) {
  const userGroups = await UserGroup.findAll(
    {
      where: { userId },
      attributes: ['groupId']
    }
  );
  return userGroups.map(group => group['groupId']);
}

module.exports = {
  findUserGroups,
  addUsersToGroup
};
