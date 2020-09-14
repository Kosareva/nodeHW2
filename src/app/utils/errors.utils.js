const HttpStatus = require('http-status-codes');

function mapErrors(schemaErrors) {
  const errors = schemaErrors.map(err => {
    const { message } = err;
    return { message };
  });
  return {
    success: false,
    errors
  };
}

/**
 *
 * @param schema
 * @param {('body'|'query')} source
 * @param context
 */
function validateSchema(schema, source = 'body', context) {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], {
      abortEarly: false,
      context
    });

    if (error && error.isJoi) {
      res.status(HttpStatus.BAD_REQUEST).json(mapErrors(error.details));
    }
    next();
  };
}

module.exports = {
  mapErrors,
  validateSchema
};
