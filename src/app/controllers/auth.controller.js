const usersDb = require('../../data-access/users-db');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { HttpError } = require('../../errors');
const HttpStatus = require('http-status-codes');

const tokenExpiresIn = 60 * 60;

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const candidate = await usersDb.getUserByLoginAndPassword(username, password);

    if (!candidate) {
      return next(
        new HttpError(`Can not find user with login ${username}`, { status: HttpStatus.NOT_FOUND })
      );
    }

    const token = jwt.sign({
      login: candidate.login,
      userId: candidate.id
    }, config.JWT, {
      expiresIn: tokenExpiresIn
    });

    res.json({
      token: `${token}`
    });
  } catch (err) {
    err.message = `Can not get access token: ${err.message}`;
    next(err);
  }
}

module.exports = {
  login
};
