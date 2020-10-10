const HttpStatus = require('http-status-codes');
const usersDb = require('../../data-access/users-db');

async function resolveUser(req, res, next, id) {
  try {
    const user = await usersDb.findUser({ id });
    if (!user) {
      const err = {
        status: HttpStatus.NOT_FOUND,
        message: 'User is not found'
      };
      return next(err);
    }
    req.user = user;
    next();
  } catch (err) {
    err.message = `User is not found: ${err.message}`;
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const user = await usersDb.addUser(req.body);
    res.json(user);
  } catch (err) {
    err.message = `Can not create user: ${err.message}`;
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const queryParams = { ...req.query, searchBy: 'login' };
    const users = await usersDb.findUsersBy(queryParams);
    res.json(users);
  } catch (err) {
    err.message = `Can not get users: ${err.message}`;
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
    const id = req.params.id;
    const deletedUser = await usersDb.deleteUser({ id });
    res.json(deletedUser);
  } catch (err) {
    err.message = `Can not remove user: ${err.message}`;
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const user = await usersDb.updateUser({
      ...req.body,
      id: req.params.id
    });
    res.json(user);
  } catch (err) {
    err.message = `Can not update user: ${err.message}`;
    next(err);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,

  resolveUser,
};
