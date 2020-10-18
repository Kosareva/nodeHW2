const HttpStatus = require('http-status-codes');
const groupsDb = require('../../data-access/groups-db');

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
    res.json(group);
  } catch (err) {
    err.message = `Can not get group by id: ${err.message}`;
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    await groupsDb.deleteById(id);
    res.json(true);
  } catch (err) {
    err.message = `Can not remove group: ${err.message}`;
    next(err);
  }
}

async function resolveGroup(req, res, next, id) {
  try {
    const group = await groupsDb.findById(id);
    if (!group) {
      const err = {
        status: HttpStatus.NOT_FOUND,
        message: 'Group is not found'
      };
      return next(err);
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
