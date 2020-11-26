const User = require('../models/user.model');

const users = [
  {
    login: 'user2',
    age: '19',
    password: 'password',
  },
  {
    login: 'user1',
    age: '18',
    password: 'password',
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.sync({ force: true });
    await User.bulkCreate(users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null);
  }
};
