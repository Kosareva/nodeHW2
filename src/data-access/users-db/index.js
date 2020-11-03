const {
  add,
  deleteById,
  findById,
  getAutoSuggestUsers,
  getUserByLoginAndPassword,
  list,
  updateById
} = require('./pg');

const usersDb = {
  add,
  deleteById,
  findById,
  getAutoSuggestUsers,
  getUserByLoginAndPassword,
  list,
  updateById
};

module.exports = usersDb;
