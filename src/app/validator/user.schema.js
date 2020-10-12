const joi = require('joi');

const baseConfig = {
  login: joi.string().alphanum().min(3).max(30),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  age: joi.number().integer().min(4).max(130)
};

const schema = joi.object().keys({
  login: joi.when('$isUpdate', {
    is: joi.boolean().valid(true),
    then: baseConfig.login.forbidden(),
    otherwise: baseConfig.login.required()
  }),
  password: joi.when('$isUpdate', {
    is: joi.boolean().valid(true),
    then: baseConfig.password.forbidden(),
    otherwise: baseConfig.password.required()
  }),
  age: joi.number().integer().min(4).max(130)
});

module.exports = schema;
