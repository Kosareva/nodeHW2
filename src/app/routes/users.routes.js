const express = require('express');
const router = express.Router();
const {
  request: requestSchema
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
  validateSchema(requestSchema.query.getAll, 'query'),
  usersController.getAll
);
router.get('/:id',
  usersController.getById
);
router.post('/',
  usersController.create
);
router.put('/:id',
  usersController.update
);
router.delete('/:id',
  usersController.remove
);

module.exports = router;
