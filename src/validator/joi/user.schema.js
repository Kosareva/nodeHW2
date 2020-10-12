const joi = require('joi');

const schema = joi.object().keys({
  login: joi.string().alphanum().min(3).max(30),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  age: joi.number().integer().min(4).max(130),
});

module.exports = schema;
