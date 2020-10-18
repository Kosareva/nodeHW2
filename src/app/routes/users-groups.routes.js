const express = require('express');
const router = express.Router();
const {
  groupsController,
  usersGroupsController
} = require('../controllers');
const routesUtils = require('./utils');

router.param('id',
  routesUtils.invokeOnMethods(
    groupsController.resolveGroup,
    ['POST']
  )
);
router.post('/:id',
  usersGroupsController.checkIfUsersExist,
  usersGroupsController.checkIfUsersBelongToGroup,
  usersGroupsController.addUsersToGroup
);

module.exports = router;
