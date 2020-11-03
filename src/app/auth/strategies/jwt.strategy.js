const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userDb = require('../../../data-access/users-db');
const config = require('../../../config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT
};

const strategy = new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await userDb.findById(jwtPayload.userId);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = strategy;
