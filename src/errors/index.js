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

class DBError extends ApplicationError {
}

class ValidationError extends ApplicationError {
  get settables() {
    return [
      'propertyName',
      'propertyValue',
      'messages'
    ];
  }

  get message() {
    return `${this.message}; ${this.propertyName} ${this.propertyValue}`;
  }
}

module.exports = {
  ApplicationError,
  DBError,
  HttpError,
  ValidationError
};
