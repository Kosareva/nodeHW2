function invokeOnMethods(fn, methods) {
  return function (...args) {
    const [req, , next] = args;
    if (methods.includes(req.method)) {
      return fn(...args);
    }
    next();
  };
}

module.exports = {
  invokeOnMethods
};
