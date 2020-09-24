const modelFactory = (validator, constructor) => {
  return (payload) => {
    const { error } = validator(payload);
    if (error) {
      throw new Error(error);
    }
    return new constructor(payload);
  };
};

module.exports = {
  modelFactory
};
