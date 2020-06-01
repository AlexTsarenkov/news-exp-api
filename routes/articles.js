const { celebrate } = require('celebrate');
const articleRoute = require('express').Router();
const articleNewsApi = require('express').Router();

const {
  postArticleValidator,
  idValidator,
} = require('../validators/validators');

const {
  getArticles,
  postArticle,
  deleteArticle,
  getArticlesFromApi,
} = require('../controllers/article');

articleRoute.get('/articles', getArticles);
articleRoute.post('/articles', celebrate(postArticleValidator), postArticle);
articleRoute.delete('/articles/:id', celebrate(idValidator), deleteArticle);
articleNewsApi.post('/', getArticlesFromApi);

module.exports = {
  articleRoute,
  articleNewsApi,
};
