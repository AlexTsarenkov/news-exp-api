/* eslint-disable no-param-reassign */
const request = require('request');
const Article = require('../model/article');

const { API_KEY } = require('../config/config');

const {
  ForbiddenError, NotFoundError,
} = require('../errors/errors');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.send(article))
    .catch(next);
};

const getArticlesFromApi = (req, res) => {
  const date = new Date();
  const preDate = new Date((date.getTime() - (7 * 24 * 60 * 60 * 1000)));

  const url = 'https://praktikum.tk/news/v2/everything?'
      + `q=${req.body.keyword}&`
      + `from=${preDate.toISOString().slice(0, 10)}&`
  // + `to=${new Date(date.getTime()).toISOString().slice(0, 10)}&`
  // + 'sortBy=popularity&'
      + 'pageSize=100&'
      + `apiKey=${API_KEY}`;

  request(url, { json: true }, (err, body) => {
    if (!err) {
      res.send(body.body.articles);
    } else {
      res.status(err.status).send(err);
    }
  });
};

const postArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      article.owner = undefined;
      res.send(article);
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
    .select('+owner')
    .orFail(() => new NotFoundError('Article not found'))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError('Forbidden action'));
      }
      return Article.findByIdAndRemove(req.params.id);
    })
    .then((article) => res.send(article))
    .catch(next);
};

module.exports = {
  getArticles,
  postArticle,
  deleteArticle,
  getArticlesFromApi,
};
