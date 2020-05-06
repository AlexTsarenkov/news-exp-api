
const { Joi } = require('celebrate');

const urlRegExp = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=.]+$');

const postArticleValidator = {
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().pattern(urlRegExp).required(),
    image: Joi.string().pattern(urlRegExp).required(),
  }),
};

const signUpValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

const signInValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const idValidator = {
  params: Joi.object().keys({
    id: Joi.string().required().length(24),
  }),
};

module.exports = {
  signInValidator,
  signUpValidator,
  idValidator,
  postArticleValidator,
};
