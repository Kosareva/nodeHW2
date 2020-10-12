const {
  userValidator,
  groupValidator
} = require('./joi');

const validator = {
  userValidator: (payload) => userValidator(payload),
  groupValidator: (payload) => groupValidator(payload)
};

module.exports = validator;
