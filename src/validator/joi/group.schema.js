const joi = require('joi');
const permissions = require('../../models/group/permissions');

const schema = joi.object().keys({
  name: joi.string(),
  permissions: joi.array().items(joi.string().valid(...permissions.asArray()))
});

module.exports = schema;
