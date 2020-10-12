const {
  add,
  deleteById,
  findById,
  getAutoSuggestUsers,
  list,
  updateById
} = require('./pg');

const usersDb = {
  add,
  deleteById,
  findById,
  getAutoSuggestUsers,
  list,
  updateById
};

module.exports = usersDb;
