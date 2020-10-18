const joi = require('joi');

const schema = joi.object().keys({
  limit: joi.number().min(1),
  substr: joi.string().min(1).required()
});

module.exports = schema;
