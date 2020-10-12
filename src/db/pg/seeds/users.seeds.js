const { User } = require('../models');

const predefinedUsers = [
  {
    login: 'user2',
    age: '19',
    password: 'password'
  },
  {
    login: 'user1',
    age: '18',
    password: 'password'
  }
];

const seed = () => {
  return User.sync({ force: true }).then(() => {
    return User.bulkCreate(predefinedUsers);
  });
};

module.exports = seed;
