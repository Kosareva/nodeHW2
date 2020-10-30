const HttpStatus = require('http-status-codes');
const { HttpError } = require('../../../errors');

const middleware = (passport) => (req, res, next) => {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      if (info && info.name === 'JsonWebTokenError') {
        return next(new HttpError(`Wrong access token`, { status: HttpStatus.FORBIDDEN }));
      }
      return next(new HttpError(`Access token is missing`, { status: HttpStatus.UNAUTHORIZED }));
    }
    req.logIn(user, { session: false }, function (err) {
      if (err) {
        return next(err);
      }
      next();
    });
  })(req, res, next);
};

module.exports = (passport) => middleware(passport);
