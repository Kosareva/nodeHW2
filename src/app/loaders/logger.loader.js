const winston = require('winston');

async function load({ logLevel, appName }) {
  const loggerName = 'appLogger';
  winston.loggers.add(loggerName, {
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: appName },
    transports: [
      new winston.transports.Console({
        level: logLevel || 'debug',
        format: winston.format.simple()
      }),
      new winston.transports.File({ filename: 'info.log', level: 'info' }),
      new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
  });
  return winston.loggers.get(loggerName);
}

module.exports = load;
