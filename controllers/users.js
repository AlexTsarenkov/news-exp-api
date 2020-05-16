/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { NotFoundError, ConflictError } = require('../errors/errors');
const { JWT_SECRET } = require('../config/config');

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Your profile missing'))
    .then((user) => res.send(user))
    .catch(next);
};

const signUp = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(`User with ${email} email already exist`);
      }

      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
        }))
        .then((createdUser) => {
          createdUser.password = undefined;
          res.status(201).send(createdUser);
        });
    })
    .catch(next);
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
        })
        .cookie('session', token, {
          maxAge: 604800000,
          httpOnly: false,
        })
        .status(200).send({ message: 'success' });
    })
    .catch(next);
};

const signOut = (req, res) => {
  res.clearCookie('session').status(200).send({ message: 'success' });
};


module.exports = {
  signIn,
  signUp,
  signOut,
  getUserMe,
};
