const { mapErrors } = require('../../utils');
const HttpStatus = require('http-status-codes');
const { ValidationError } = require('../../../errors');

const middleware = ({ logger }) => (err, req, res, next) => {
  let status = err.status;
  let message = err.message;
  let messages = err.messages || '';
  if (!err.status) {
    switch (true) {
      case err instanceof ValidationError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }
  }
  if (!err.message) {
    message = HttpStatus.getStatusText(status);
  }
  logger.error(`${status}: ${JSON.stringify(messages) || message}`);
  res.status(status)
    .json(mapErrors(messages || [{ message }]));
};

module.exports = ({ logger }) => middleware({ logger });
