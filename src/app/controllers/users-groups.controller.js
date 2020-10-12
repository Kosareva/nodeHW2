const usersGroupsDb = require('../../data-access/users-groups-db');
const usersDb = require('../../data-access/users-db');

async function addUsersToGroup(req, res, next) {
  try {
    const { id: groupId } = req.params;
    const { userIds } = req.body;
    await usersGroupsDb.addUsersToGroup(groupId, userIds);
    res.json(true);
  } catch (err) {
    err.message = `Can not add users to the group: ${err.message}`;
    next(err);
  }
}

async function checkIfUsersBelongToGroup(req, res, next) {
  try {
    const { userIds } = req.body;
    const { id: groupId } = req.params;

    let err;
    for (const userId of userIds) {
      const userGroups = await usersGroupsDb.findUserGroups(userId);
      if (userGroups.includes(groupId)) {
        err = {
          message: `User with id ${userId} is already belongs to the ${groupId} group`
        };
        break;
      }
    }

    next(err);
  } catch (err) {
    next(err);
  }
}

async function checkIfUsersExist(req, res, next) {
  try {
    const { userIds } = req.body;
    if (!userIds || !userIds.length) {
      return next({
        message: 'User ids are not defined'
      });
    }

    let err;
    for (const userId of userIds) {
      const user = await usersDb.findById(userId);
      if (!user) {
        err = {
          message: `User with id ${userId} does not exist`
        };
        break;
      }
    }

    next(err);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addUsersToGroup,
  checkIfUsersExist,
  checkIfUsersBelongToGroup
};
