const {
  add,
  deleteById,
  findById,
  list,
  updateById
} = require('./pg');

const groupsDb = {
  add,
  deleteById,
  findById,
  list,
  updateById
};

module.exports = groupsDb;
