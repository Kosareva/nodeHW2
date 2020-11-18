const usersDb = require('../../../data-access/users-db');
const { HttpError } = require('../../../errors');
const { usersController } = require('../../controllers');

jest.mock('../../../data-access/users-db', () => ({
  add: jest.fn(),
  deleteById: jest.fn(),
  findById: jest.fn(),
  getAutoSuggestUsers: jest.fn(),
  list: jest.fn(),
  updateById: jest.fn(),
}));

jest.mock('../../../errors', () => ({
  HttpError: jest.fn(),
}));

jest.mock('http-status-codes', () => ({
  NOT_FOUND: 404,
}));

describe('users controller', () => {
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

  describe('create user', () => {
    it('should return user', async () => {
      usersDb.add.mockReturnValue(true);
      await usersController.create(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should pass arguments from request', async () => {
      req.body = {};
      usersDb.add.mockReturnValue(true);
      await usersController.create(req, res, next);
      expect(usersDb.add).toHaveBeenCalledWith(req.body);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not create user: ${err.message}`;
      usersDb.add.mockReturnValue(Promise.reject(err));
      await usersController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('get all users', () => {
    it('should return users', async () => {
      usersDb.list.mockReturnValue(true);
      await usersController.getAll(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not get users: ${err.message}`;
      usersDb.list.mockReturnValue(Promise.reject(err));
      await usersController.getAll(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('get auto suggest users', () => {
    beforeEach(() => {
      req.query = {};
    });

    it('should return auto suggest users', async () => {
      usersDb.getAutoSuggestUsers.mockReturnValue(true);
      await usersController.getAutoSuggestUsers(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should pass arguments from request', async () => {
      const [limit, substr] = [1, 'substr'];
      req.query = { limit, substr };
      usersDb.getAutoSuggestUsers.mockReturnValue(true);
      await usersController.getAutoSuggestUsers(req, res, next);
      expect(usersDb.getAutoSuggestUsers).toHaveBeenCalledWith(substr, limit);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not get auto suggest users: ${err.message}`;
      usersDb.getAutoSuggestUsers.mockReturnValue(Promise.reject(err));
      await usersController.getAutoSuggestUsers(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });

  describe('get user by id ', () => {
    beforeEach(() => {
      req.user = {};
    });

    it('should return user from request object', async () => {
      await usersController.getById(req, res, next);
      expect(res.json).toHaveBeenCalledWith(req.user);
    });
  });

  describe('remove user', () => {
    beforeEach(() => {
      req.params = {
        id: null
      };
    });

    it('should return user removal result', async () => {
      usersDb.deleteById.mockReturnValue(true);
      await usersController.remove(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should pass arguments from request', async () => {
      const id = 'id';
      req.params.id = id;
      usersDb.deleteById.mockReturnValue(true);
      await usersController.remove(req, res, next);
      expect(usersDb.deleteById).toHaveBeenCalledWith(id);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not remove user: ${err.message}`;
      usersDb.deleteById.mockReturnValue(Promise.reject(err));
      await usersController.remove(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });

    it('should throw an error if user is not found', async () => {
      usersDb.deleteById.mockReturnValue(false);
      await usersController.remove(req, res, next);
      const httpErrorInstance = HttpError.mock.instances[0];
      expect(HttpError).toHaveBeenCalledTimes(1);
      expect(HttpError).toHaveBeenCalledWith('User is not found', {
        status: 404
      });
      expect(next).toHaveBeenCalledWith(httpErrorInstance);
    });
  });

  describe('resolve user', () => {
    let param;

    beforeEach(() => {
      param = 'id';
    });

    it('should pass arguments from request', async () => {
      usersDb.findById.mockReturnValue(true);
      await usersController.resolveUser(req, res, next, param);
      expect(usersDb.findById).toHaveBeenCalledWith(param);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `User is not found: ${err.message}`;
      usersDb.findById.mockReturnValue(Promise.reject(err));
      await usersController.resolveUser(req, res, next, param);
      expect(next).toHaveBeenCalledWith(err);
    });

    it('should throw an error if user is not found', async () => {
      usersDb.findById.mockReturnValue(false);
      await usersController.resolveUser(req, res, next, param);
      const httpErrorInstance = HttpError.mock.instances[0];
      expect(HttpError).toHaveBeenCalledTimes(1);
      expect(HttpError).toHaveBeenCalledWith('User is not found', {
        status: 404
      });
      expect(next).toHaveBeenCalledWith(httpErrorInstance);
    });

    describe('if user is found', () => {
      beforeEach(async () => {
        usersDb.findById.mockReturnValue(true);
        await usersController.resolveUser(req, res, next, param);
      });

      it('should set user to request object', () => {
        expect(req.user).toEqual(true);
      });

      it('should proceed to the next handler', () => {
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('update user', () => {
    beforeEach(() => {
      req.params = {
        id: 'id'
      };
      req.body = {};
    });

    it('should return updated user', async () => {
      usersDb.updateById.mockReturnValue(true);
      await usersController.update(req, res, next);
      expect(res.json).toHaveBeenCalledWith(true);
    });

    it('should pass arguments from request and params', async () => {
      usersDb.updateById.mockReturnValue(true);
      await usersController.update(req, res, next);
      expect(usersDb.updateById).toHaveBeenCalledWith(req.params.id, req.body);
    });

    it('should throw an error on db error', async () => {
      const err = new Error('message');
      err.message = `Can not update user: ${err.message}`;
      usersDb.updateById.mockReturnValue(Promise.reject(err));
      await usersController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(err);
    });

    it('should throw an error if user is not found', async () => {
      usersDb.updateById.mockReturnValue(false);
      await usersController.update(req, res, next);
      const httpErrorInstance = HttpError.mock.instances[0];
      expect(HttpError).toHaveBeenCalledTimes(1);
      expect(HttpError).toHaveBeenCalledWith('User is not found', {
        status: 404
      });
      expect(next).toHaveBeenCalledWith(httpErrorInstance);
    });
  });
});
