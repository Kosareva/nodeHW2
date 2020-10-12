const joi = require('joi');
const permissions = require('../../models/group/permissions');

const baseConfig = {
  name: joi.string(),
  permissions: joi.array().items(joi.string().valid(...permissions.asArray()))
};

const schema = joi.object().keys({
  name: joi.when('$isUpdate', {
    is: joi.boolean().valid(true),
    then: baseConfig.name,
    otherwise: baseConfig.name.required()
  }),
  permissions: baseConfig.permissions
});

module.exports = schema;
