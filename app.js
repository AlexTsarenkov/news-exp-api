require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { PORT } = require('./config/config');

const app = express();
const { userRoute, loginRoute } = require('./routes/users');
const { articleRoute } = require('./routes/articles');
const { auth } = require('./middlewares/auth');
const { error } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/news-app-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.use('/', loginRoute);
app.use('/api', auth, userRoute);
app.use('/api', auth, articleRoute);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
