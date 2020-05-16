/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { UnathorizedError } = require('../errors/errors');
const { JWT_SECRET } = require('../config/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const sessionToken = req.cookies.session;

  let payload;
  let sessionPayload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnathorizedError('Authorization require'));
  }

  try {
    sessionPayload = jwt.verify(sessionToken, JWT_SECRET);
  } catch (err) {
    next(new UnathorizedError('Authorization require'));
  }

  if (payload._id !== sessionPayload._id) {
    next(new UnathorizedError('Authorization require'));
  }

  req.user = payload;
  next();
};

module.exports = { auth };
