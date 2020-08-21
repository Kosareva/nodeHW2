const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const db = require('../../db');

const saltRounds = 10;

async function create(req, res, next) {
  try {
    const { login, password, age } = req.body;
    const id = uuid();
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    const usersCollection = await db.collection('users');
    const userData = { id, login, password: passwordHash, age };
    const user = usersCollection.create(userData);
    await db.synchronize();
    res.json(user);
  } catch (err) {
    err.message = `Can not create user: ${err.message}`;
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const queryParams = { ...req.query, searchBy: 'login' };
    const usersCollection = await db.collection('users');
    const users = usersCollection.getAll(queryParams);
    res.json(users);
  } catch (err) {
    err.message = `Can not get users: ${err.message}`;
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const usersCollection = await db.collection('users');
    const user = usersCollection.getById(id);
    if (!user) {
      const err = {
        status: HttpStatus.NOT_FOUND,
        message: 'User is not found'
      };
      next(err);
    } else {
      res.json(user);
    }
  } catch (err) {
    err.message = `Can not get user: ${err.message}`;
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const usersCollection = await db.collection('users');
    const user = usersCollection.remove(id);
    if (!user) {
      const err = {
        status: HttpStatus.NOT_FOUND,
        message: 'User is not found'
      };
      next(err);
    } else {
      await db.synchronize();
      res.json(user);
    }
  } catch (err) {
    err.message = `Can not remove user: ${err.message}`;
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const { password, age } = req.body;
    const usersCollection = await db.collection('users');
    const user = usersCollection.update(id, {
      ...password && { password },
      ...age && { age },
    });
    await db.synchronize();
    if (!user) {
      const err = {
        status: HttpStatus.NOT_FOUND,
        message: 'User is not found'
      };
      next(err);
    } else {
      res.json(user);
    }
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
  update
};
