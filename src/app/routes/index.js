const userRoutes = require('./users.routes');
const groupRoutes = require('./groups.routes');
const userGroupRoutes = require('./users-groups.routes');
const authRoutes = require('./auth.routes');

// TODO: check const/file naming: singular or plural
module.exports = {
  userRoutes,
  groupRoutes,
  userGroupRoutes,
  authRoutes
};
