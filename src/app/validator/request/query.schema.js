const joi = require('joi');

const schema = joi.object().keys({
  sort: joi.string().valid('ASC', 'DESC'),
  limit: joi.number().min(1),
  substr: joi.string().min(1)
});

module.exports = schema;
