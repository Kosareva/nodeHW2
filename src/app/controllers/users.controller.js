const HttpStatus = require('http-status-codes');
const usersDb = require('../../data-access/users-db');
const { HttpError } = require('../../errors');

async function create(req, res, next) {
  try {
    const user = await usersDb.add(req.body);
    res.json(user);
  } catch (err) {
    err.message = `Can not create users: ${err.message}`;
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const users = await usersDb.list();
    res.json(users);
  } catch (err) {
    err.message = `Can not get users: ${err.message}`;
    next(err);
  }
}

async function getAutoSuggestUsers(req, res, next) {
  try {
    const { limit, substr } = req.query;
    const users = await usersDb.getAutoSuggestUsers(substr, limit);
    res.json(users);
  } catch (err) {
    err.message = `Can not get auto suggest users: ${err.message}`;
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    res.json(req.user);
  } catch (err) {
    err.message = `Can not get user: ${err.message}`;
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const isUserDeleted = await usersDb.deleteById(id);
    if (!isUserDeleted) {
      return next(
        new HttpError(`User is not found`, {
          status: HttpStatus.NOT_FOUND
        })
      );
    }
    res.json(isUserDeleted);
  } catch (err) {
    err.message = `Can not remove user: ${err.message}`;
    next(err);
  }
}

async function resolveUser(req, res, next, id) {
  try {
    const user = await usersDb.findById(id);
    if (!user) {
      return next(
        new HttpError(`User is not found`, {
          status: HttpStatus.NOT_FOUND
        })
      );
    }
    req.user = user;
    next();
  } catch (err) {
    err.message = `User is not found: ${err.message}`;
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const user = await usersDb.updateById(id, req.body);
    if (!user) {
      return next(
        new HttpError(`User is not found`, {
          status: HttpStatus.NOT_FOUND
        })
      );
    }
    res.json(user);
  } catch (err) {
    err.message = `Can not update user: ${err.message}`;
    next(err);
  }
}

module.exports = {
  create,
  getAll,
  getAutoSuggestUsers,
  getById,
  remove,
  update,

  resolveUser,
};
