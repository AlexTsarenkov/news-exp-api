const { celebrate } = require('celebrate');
const articleRoute = require('express').Router();

const {
  postArticleValidator,
  idValidator,
} = require('../validators/validators');

const {
  getArticles,
  postArticle,
  deleteArticle,
} = require('../controllers/article');

articleRoute.get('/articles', getArticles);
articleRoute.post('/articles', celebrate(postArticleValidator), postArticle);
articleRoute.delete('/:id', celebrate(idValidator), deleteArticle);

module.exports = {
  articleRoute,
};
