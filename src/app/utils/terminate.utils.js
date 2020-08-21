function terminate(server) {
  const exit = code => process.exit(code);
  return (code, reason) => (err) => {
    if (err && err instanceof Error) {
      console.log(`${code}: ${reason}`, err.stack);
    }
    server.close(exit);
    setTimeout(exit, 1000).unref();
  };
}

module.exports = { terminate };
