const joi = require('joi');

const getAll = joi.object().keys({
  sortBy: joi.string(),
  limit: joi.number().min(1),
  substr: joi.string()
});

module.exports = {
  getAll
};
