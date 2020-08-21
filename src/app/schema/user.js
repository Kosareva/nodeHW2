const joi = require('joi');

const passwordBaseSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);

const schema = joi.object().keys({
  id: joi.when('$isUpdate', {
    is: joi.boolean().valid(true).required(),
    then: joi.forbidden(),
    otherwise: joi.string().guid()
  }),
  login: joi.when('$isUpdate', {
    is: joi.boolean().valid(true).required(),
    then: joi.forbidden(),
    otherwise: joi.string().alphanum().min(3).max(30).required()
  }),
  password: joi.when('$isUpdate', {
    is: joi.boolean().valid(true).required(),
    then: passwordBaseSchema,
    otherwise: passwordBaseSchema.required()
  }),
  age: joi.number().integer().min(4).max(130),
  isDeleted: joi.forbidden()
});

module.exports = schema;
