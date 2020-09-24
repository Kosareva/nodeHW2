const { modelFactory } = require('../utils');

class User {
  constructor({ login, password, age } = {}) {
    this.login = login;
    this.password = password;
    this.age = age;
  }
}

const userFactory = (validator) => modelFactory(validator, User);

module.exports = userFactory;
