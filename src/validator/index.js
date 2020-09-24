const { userValidator } = require('./joi');

const validator = {
  userValidator: (payload) => userValidator(payload)
};

module.exports = validator;
