const express = require('express');
const router = express.Router();
const routesUtils = require('./utils');
const { groupsController } = require('../controllers');
const { validateSchema } = require('../utils');
const { group: groupSchema } = require('../validator');

router.param('id',
  routesUtils.invokeOnMethods(
    groupsController.resolveGroup,
    ['GET', 'DELETE', 'PUT']
  )
);
router.get('/',
  groupsController.getAll
);
router.get('/:id',
  groupsController.getById
);
router.post('/',
  validateSchema(groupSchema, 'body', { isUpdate: false }),
  groupsController.create
);
router.put('/:id',
  validateSchema(groupSchema, 'body', { isUpdate: true }),
  groupsController.update
);
router.delete('/:id',
  groupsController.remove
);

module.exports = router;
