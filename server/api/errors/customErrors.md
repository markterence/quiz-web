# Example

```js
export class CustomError extends Error {
  constructor(
    public message: string = "No message",
    public code: string | number = "INTERNAL_ERROR",
    public status: number = 500,
    public data: ErrorData = {}
  ) {
    super();
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(originalUrl: string) {
    super(`Route '${originalUrl}' does not exist.`, "ROUTE_NOT_FOUND", 404);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(entityName: string) {
    super(`${entityName} not found.`, "ENTITY_NOT_FOUND", 404);
  }
}

export class BadUserInputError extends CustomError {
  constructor(errorData: ErrorData) {
    super("There were validation errors.", "BAD_USER_INPUT", 400, errorData);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message = "Authentication token is invalid.") {
    super(message, "INVALID_TOKEN", 401);
  }
}

// Beyon

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = {
  ErrorHandler
}


// centralized error object that derives from Node’s Error
function AppError(name, httpCode, description, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.name = name;
  //...other properties assigned here
};

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

module.exports.AppError = AppError;

// client throwing an exception
if(user == null)
  throw new AppError(commonErrors.resourceNotFound, commonHTTPErrors.notFound, 'further explanation', true)

```
