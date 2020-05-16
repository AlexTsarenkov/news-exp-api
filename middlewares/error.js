/* eslint-disable no-unused-vars */
const error = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Iternal server error'
      : message,
  });
};

module.exports = { error };
