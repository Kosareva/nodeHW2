const express = require('express');
const router = express.Router();
const {
  request: requestSchema,
  user: userSchema
} = require('../schema');
const { validateSchema } = require('../utils');
const { usersController } = require('../controllers');

router.param('id',
  usersController.handleUserIdParam
);
router.get('/',
  validateSchema(requestSchema.query.getAll, 'query'),
  usersController.getAll
);
router.get('/:id',
  usersController.getById
);
router.post('/',
  validateSchema(userSchema),
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
