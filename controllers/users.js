/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { NotFoundError, ConflictError } = require('../errors/errors');

let JWT_SECRET;

if (process.env.NODE_ENV === 'production') {
  JWT_SECRET = process.env.JWT_SECRET;
} else {
  JWT_SECRET = 'supersecretdevkey';
}


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
      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
      }).status(200).send({ message: 'success' });
    })
    .catch(next);
};


module.exports = {
  signIn,
  signUp,
  getUserMe,
};
