const {
  findUser,
  findUsersBy,
  addUser,
  updateUser,
  deleteUser
} = require('./pg');

const usersDb = {
  findUser,
  findUsersBy,
  addUser,
  updateUser,
  deleteUser
};

module.exports = usersDb;
