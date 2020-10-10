const joi = require('joi');

const passwordBaseSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);

const schema = joi.object().keys({
  login: joi.string().alphanum().min(3).max(30).required(),
  password: passwordBaseSchema.required(),
  age: joi.number().integer().min(4).max(130),
});

module.exports = schema;
