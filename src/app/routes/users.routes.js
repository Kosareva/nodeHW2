const express = require('express');
const router = express.Router();
const {
  request: requestSchema,
  user: userSchema
} = require('../validator');
const { validateSchema } = require('../utils');
const { usersController } = require('../controllers');
const routesUtils = require('./utils');

router.param('id',
  routesUtils.invokeOnMethods(
    usersController.resolveUser,
    ['GET', 'DELETE', 'PUT']
  )
);
router.get('/',
  usersController.getAll
);
router.get('/auto-suggest',
  validateSchema(requestSchema.autoSuggestUsersQuery, 'query'),
  usersController.getAutoSuggestUsers
);
router.get('/:id',
  usersController.getById
);
router.post('/',
  validateSchema(userSchema, 'body', { isUpdate: false }),
  usersController.create
);
router.put('/:id',
  validateSchema(userSchema, 'body', { isUpdate: true }),
  usersController.update
);
router.delete('/:id',
  usersController.remove
);

module.exports = router;
