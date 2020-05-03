const { celebrate } = require('celebrate');
const userRoute = require('express').Router();
const loginRoute = require('express').Router();

const {
  signIn,
  signUp,
  getUserMe,
} = require('../controllers/users.js');

const {
  signInValidator,
  signUpValidator,
} = require('../validators/validators.js');

userRoute.get('/users/me', getUserMe);
loginRoute.post('/signin', celebrate(signInValidator), signIn);
loginRoute.post('/signup', celebrate(signUpValidator), signUp);

module.exports = { userRoute, loginRoute };
