const permissions = {
  READ: 'READ',
  WRITE: 'WRITE',
  DELETE: 'DELETE',
  SHARE: 'SHARE',
  UPLOAD_FILES: 'UPLOAD_FILES',
};

module.exports = {
  enum: permissions,
  asArray: () => Object.values(permissions)
};
