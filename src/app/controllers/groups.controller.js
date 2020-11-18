const HttpStatus = require('http-status-codes');
const groupsDb = require('../../data-access/groups-db');
const { HttpError } = require('../../errors');

async function create(req, res, next) {
  try {
    const group = await groupsDb.add(req.body);
    res.json(group);
  } catch (err) {
    err.message = `Can not create group: ${err.message}`;
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const groups = await groupsDb.list();
    res.json(groups);
  } catch (err) {
    err.message = `Can not get groups: ${err.message}`;
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const group = req.group;
    if (!group) {
      return next(
        new HttpError(`Group is not found`, {
          status: HttpStatus.NOT_FOUND
        })
      );
    }
    res.json(group);
  } catch (err) {
    err.message = `Can not get group by id: ${err.message}`;
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    const isGroupDeleted = await groupsDb.deleteById(id);
    if (!isGroupDeleted) {
      return next(
        new HttpError(`Group is not found`, {
          status: HttpStatus.NOT_FOUND
        })
      );
    }
    res.json(isGroupDeleted);
  } catch (err) {
    err.message = `Can not remove group: ${err.message}`;
    next(err);
  }
}

async function resolveGroup(req, res, next, id) {
  try {
    const group = await groupsDb.findById(id);
    if (!group) {
      return next(
        new HttpError(`Group is not found`, {
          status: HttpStatus.NOT_FOUND
        })
      );
    }
    req.group = group;
    next();
  } catch (err) {
    err.message = `Group is not found: ${err.message}`;
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const group = await groupsDb.updateById(id, req.body);
    if (!group) {
      return next(
        new HttpError(`Group is not found`, {
          status: HttpStatus.NOT_FOUND
        })
      );
    }
    res.json(group);
  } catch (err) {
    err.message = `Can not update group: ${err.message}`;
    next(err);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,

  resolveGroup,
};
