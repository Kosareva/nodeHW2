const { modelFactory } = require('../utils');

class Group {
  constructor({ name, permissions = [] }) {
    this.name = name;
    this.permissions = permissions;
  }
}

const groupFactory = (validator) => modelFactory(validator, Group);

module.exports = groupFactory;
