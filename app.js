require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { errors } = require('celebrate');
const { PORT, DB_PATH } = require('./config/config');

const app = express();
const { error } = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { cors }= require('./middlewares/cors');
const { NotFoundError } = require('./errors/errors');
const { apiLimit } = require('./config/rate-limit');
const { router } = require('./routes/index');

const corsWhiteList = ['http://localhost:8080', 'https://alextsarenkov.github.io', undefined];
const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  options: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
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
app.use('/', router);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Resourse not found'));
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
