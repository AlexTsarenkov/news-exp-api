require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const { PORT, DB_PATH } = require('./config/config');

const app = express();
const { error } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const { NotFoundError } = require('./errors/errors');
const { apiLimit } = require('./config/rate-limit');
const { router } = require('./routes/index');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.use('/api/', apiLimit);
app.use('/', cors, router);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Resourse not found'));
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
