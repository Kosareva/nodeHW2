const {
  addUsersToGroup,
  findUserGroups
} = require('./pg');

const usersGroupsDb = {
  addUsersToGroup,
  findUserGroups
};

module.exports = usersGroupsDb;
