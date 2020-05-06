/* eslint-disable no-param-reassign */
const Article = require('../model/article');
const {
  ForbiddenError, NotFoundError,
} = require('../errors/errors');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => res.send(article))
    .catch(next);
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
};
