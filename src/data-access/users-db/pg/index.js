const { User } = require('../../../db/pg/models');
const { Op } = require('sequelize');
const makeUser = require('../../../models/user');

async function addUser(data) {
  const user = makeUser(data);
  return User.create(user);
}

async function deleteUser({ id }) {
  const user = await User.findByPk(id);
  return user.destroy();
}

async function findUser({ id }) {
  return User.findByPk(id);
}

async function findUsersBy({ limit, substr, searchBy, sortBy }) {
  const query = {
    ...limit && { limit },
    ...substr && searchBy && {
      where: {
        [searchBy]: {
          [Op.like]: `%${substr}%`
        }
      }
    },
    ...sortBy && {
      order: [
        [sortBy, 'ASC']
      ]
    }
  };
  return User.findAll(query);
}

async function updateUser({ age, id, password }) {
  const user = await User.findByPk(id);
  return user.update({ age, id, password });
}

module.exports = {
  addUser,
  deleteUser,
  findUser,
  findUsersBy,
  updateUser
};
