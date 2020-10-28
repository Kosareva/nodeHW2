class ApplicationError extends Error {
  constructor(props, options = {}) {
    super(props);
    for (let key of this.settables) {
      this[key] = options[key];
    }
  }

  get name() {
    return this.constructor.name;
  }

  get settables() {
    return [];
  }
}

class HttpError extends ApplicationError {
  get settables() {
    return [
      'status'
    ];
  }
}

module.exports = {
  ApplicationError,
  HttpError
};
