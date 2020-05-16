const ForbiddenError = require('./forbidden-err');
const NotFoundError = require('./not-found-err');
const UnathorizedError = require('./unathorized-err');
const ConflictError = require('./conflict-err');

module.exports = {
  ForbiddenError, NotFoundError, UnathorizedError, ConflictError,
};
