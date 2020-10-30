function terminate(server, logger) {
  const exit = code => process.exit(code);
  return (code, reason) => (err) => {
    if (err && err instanceof Error) {
      logger.error(`${code}: ${reason} ${err.stack || err}`);
    }
    server.close(exit);
    setTimeout(exit, 1000).unref();
  };
}

module.exports = { terminate };
