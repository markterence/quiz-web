/* eslint-disable no-unused-vars */
class CustomError extends Error {
  constructor(
    code = 'INTERNAL_ERROR',
    httpCode = 500,
    description = 'No message',
    isOperational = false,
    data = {}
  ) {
    super();
    this.code = code;
    this.httpCode = httpCode;
    this.status = httpCode;
    this.message = description;
    this.name = code;
    this.data = data;
    this.isOperational = isOperational;
  }
}

class ServerError extends CustomError {
  constructor({
    data = {},
    httpCode = 500,
    description = 'Internal server error',
    code = 'INTERNAL_ERROR',
  }) {
    super(code, httpCode, description, false, data);

    Error.call(this);
    Error.captureStackTrace(this);
  }
}

class EntityNotFoundError extends CustomError {
  constructor(entityName = '', data = {}, isOperational = true) {
    super(
      'ENTITY_NOT_FOUND',
      404,
      `${entityName} not found`.trim(),
      isOperational,
      data
    );
  }
}

class BadUserInputError extends CustomError {
  constructor({ data = {}, description = 'Bad User Input' }) {
    super('BAD_USER_INPUT', 400, description, true, data);
  }
}

class InvalidTokenError extends CustomError {
  constructor(message = 'Authentication token is invalid', data = {}) {
    super('INVALID_TOKEN', 401, message, true, data);
  }
}

/**
 * @deprecated
 * Please use `PermissionError`
 * @description
 * Does not have appropriate permissions
 */
class NoPermissionError extends CustomError {
  constructor(message = 'No permission', data = {}) {
    super('NO_PERMISSION', 401, message, true, data);
  }
}

/**
 * Does not have appropriate permissions
 */
class PermissionError extends CustomError {
  constructor(message = 'Not Allowed', data = {}) {
    super('NOT_ALLOWED', 403, message, true, data);
  }
}

module.exports = {
  CustomError,
  ServerError,
  EntityNotFoundError,
  InvalidTokenError,
  BadUserInputError,
  NoPermissionError,
  PermissionError,
};
