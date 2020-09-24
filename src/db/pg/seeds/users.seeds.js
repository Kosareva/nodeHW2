const Users = require('../models').User;

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
  return Users.sync({ force: true }).then(() => {
    return Users.bulkCreate(predefinedUsers);
  });
};

module.exports = seed;
