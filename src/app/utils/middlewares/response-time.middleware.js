const NS_PER_MS = 1e6;

function responseTime({ logger }) {
  return function (req, res, next) {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
      const diff = process.hrtime(startHrTime);
      const diffInMs = diff[0] * 1000 + diff[1] / NS_PER_MS;
      logger.info(`${req.path}: ${diffInMs}ms`);
    });
    next();
  };
}

module.exports = responseTime;
