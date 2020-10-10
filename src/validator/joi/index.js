const userSchema = require('./user.schema');

const JoiValidator = (payload, schema) => {
  const { error } = schema.validate(payload, { abortEarly: false });
  if (error) {
    const message = error.details.map(el => el.message).join('\n');
    return {
      error: message
    };
  }
  return true;
};

const validator = {
  userValidator: (payload) => JoiValidator(payload, userSchema),
};

module.exports = validator;
