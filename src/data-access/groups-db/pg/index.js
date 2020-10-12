const { Group } = require('../../../db/pg/models');
// TODO: be consistent in exporting from model file
const { makeGroup } = require('../../../models/group');

async function add(data) {
  const group = makeGroup(data);
  return Group.create(group);
}

async function deleteById(id) {
  const group = await Group.findByPk(id);
  await group.destroy();
  return true;
}

async function findById(id) {
  return Group.findByPk(id);
}

async function list() {
  return Group.findAll();
}

async function updateById(id, data) {
  const group = await Group.findByPk(id);
  return group.update(data);
}

module.exports = {
  add,
  deleteById,
  findById,
  list,
  updateById
};
