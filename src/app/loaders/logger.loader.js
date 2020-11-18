const winston = require('winston');
const config = require('../../config');

const transports = [];

if (config.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console());
  transports.push(new winston.transports.File({ filename: 'info.log', level: 'info' }));
  transports.push(new winston.transports.File({ filename: 'error.log', level: 'error' }));
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  );
}

const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

module.exports = logger;
