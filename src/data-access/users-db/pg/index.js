const {
  User,
  UserGroup
} = require('../../../db/pg/models');
const { Op } = require('sequelize');
const makeUser = require('../../../models/user');
const sequelize = require('../../../db/sequelize');

async function add(data) {
  const user = makeUser(data);
  return User.create(user);
}

async function deleteById(id) {
  await sequelize.transaction(async t => {
    const user = await User.findByPk(id, { transaction: t });
    await user.destroy({ transaction: t });
    await UserGroup.destroy({
      where: { 'userId': id },
      transaction: t
    });
  });
  return true;
}

async function findById(id) {
  return User.findByPk(id);
}

async function getAutoSuggestUsers(loginSubstr, limit) {
  return User.findAll({
    where: {
      login: {
        [Op.like]: `%${loginSubstr}%`
      }
    },
    order: [
      ['login', 'ASC']
    ],
    limit
  });
}

async function list() {
  return User.findAll();
}

async function updateById(id, data) {
  const user = await User.findByPk(id);
  const newUser = makeUser(data);
  return user.update(newUser);
}

module.exports = {
  add,
  deleteById,
  findById,
  getAutoSuggestUsers,
  list,
  updateById
};
