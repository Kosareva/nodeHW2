const groupsDb = require('../../../data-access/groups-db');
const { HttpError } = require('../../../errors');
const { groupsController } = require('../../controllers');

jest.mock('../../../data-access/groups-db', () => ({
  add: jest.fn(),
  deleteById: jest.fn(),
  findById: jest.fn(),
  list: jest.fn(),
  updateById: jest.fn(),
}));

jest.mock('../../../errors', () => ({
  HttpError: jest.fn(),
}));

jest.mock('http-status-codes', () => ({
  NOT_FOUND: 404,
}));

describe('groups controller', () => {
  let req,
    res,
    next;

  beforeEach(() => {
    req = {};
    res = { json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    HttpError.mockClear();
  });

  describe('create group', () => {
    it('should return group', async () => {
      groupsDb.add.mockReturnValue(true);
      await groupsController.create(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should pass arguments from request', async () => {
      req.body = {};
      groupsDb.add.mockReturnValue(true);
      await groupsController.create(req, res, next);
      expect(groupsDb.add).toHaveBeenCalledWith(req.body);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not create group: ${err.message}`;
      groupsDb.add.mockReturnValue(Promise.reject(err));
      await groupsController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('get all groups', () => {
    it('should return groups', async () => {
      groupsDb.list.mockReturnValue(true);
      await groupsController.getAll(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not get groups: ${err.message}`;
      groupsDb.list.mockReturnValue(Promise.reject(err));
      await groupsController.getAll(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('get group by id ', () => {
    beforeEach(() => {
      req.group = {};
    });

    it('should return group from request object', async () => {
      await groupsController.getById(req, res, next);
      expect(res.json).toHaveBeenCalledWith(req.group);
    });
  });

  describe('remove group', () => {
    beforeEach(() => {
      req.params = {
        id: null
      };
    });

    it('should return group removal result', async () => {
      groupsDb.deleteById.mockReturnValue(true);
      await groupsController.remove(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should pass arguments from request', async () => {
      const id = 'id';
      req.params.id = id;
      groupsDb.deleteById.mockReturnValue(true);
      await groupsController.remove(req, res, next);
      expect(groupsDb.deleteById).toHaveBeenCalledWith(id);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not remove group: ${err.message}`;
      groupsDb.deleteById.mockReturnValue(Promise.reject(err));
      await groupsController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });

    it('should throw an error if group is not found', async () => {
      groupsDb.deleteById.mockReturnValue(false);
      await groupsController.remove(req, res, next);
      const httpErrorInstance = HttpError.mock.instances[0];
      expect(HttpError).toHaveBeenCalledTimes(1);
      expect(HttpError).toHaveBeenCalledWith('Group is not found', {
        status: 404
      });
      expect(next).toHaveBeenCalledWith(httpErrorInstance);
    });
  });

  describe('resolve group', () => {
    let param;

    beforeEach(() => {
      param = 'id';
    });

    it('should pass arguments from request', async () => {
      groupsDb.findById.mockReturnValue(true);
      await groupsController.resolveGroup(req, res, next, param);
      expect(groupsDb.findById).toHaveBeenCalledWith(param);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Group is not found: ${err.message}`;
      groupsDb.findById.mockReturnValue(Promise.reject(err));
      await groupsController.resolveGroup(req, res, next, param);
      expect(next).toHaveBeenCalledWith(err);
    });

    it('should throw an error if group is not found', async () => {
      groupsDb.findById.mockReturnValue(false);
      await groupsController.resolveGroup(req, res, next, param);
      const httpErrorInstance = HttpError.mock.instances[0];
      expect(HttpError).toHaveBeenCalledTimes(1);
      expect(HttpError).toHaveBeenCalledWith('Group is not found', {
        status: 404
      });
      expect(next).toHaveBeenCalledWith(httpErrorInstance);
    });

    describe('if group is found', () => {
      beforeEach(async () => {
        groupsDb.findById.mockReturnValue(true);
        await groupsController.resolveGroup(req, res, next, param);
      });

      it('should set group to request object', () => {
        expect(req.group).toEqual(true);
      });

      it('should proceed to the next handler', () => {
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('update group', () => {
    beforeEach(() => {
      req.params = {
        id: 'id'
      };
      req.body = {};
    });

    it('should return updated group', async () => {
      groupsDb.updateById.mockReturnValue(true);
      await groupsController.update(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should pass arguments from request and params', async () => {
      groupsDb.updateById.mockReturnValue(true);
      await groupsController.update(req, res, next);
      expect(groupsDb.updateById).toHaveBeenCalledWith(req.params.id, req.body);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not update group: ${err.message}`;
      groupsDb.updateById.mockReturnValue(Promise.reject(err));
      await groupsController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });

    it('should throw an error if group is not found', async () => {
      groupsDb.updateById.mockReturnValue(false);
      await groupsController.update(req, res, next);
      const httpErrorInstance = HttpError.mock.instances[0];
      expect(HttpError).toHaveBeenCalledTimes(1);
      expect(HttpError).toHaveBeenCalledWith('Group is not found', {
        status: 404
      });
      expect(next).toHaveBeenCalledWith(httpErrorInstance);
    });
  });
});
