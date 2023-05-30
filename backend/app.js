require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const auth = require('./middlewares/auth');
const { onUserCreateValidation, onUserLoginValidation } = require('./middlewares/validation');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const allowedCors = {
  origin: [
    'https://askorolkov.nomoredomains.rocks',
    'http://askorolkov.nomoredomains.rocks',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(allowedCors));
app.use((req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  console.log(origin);
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    console.log('includes');
  }

  return next();
});
app.use(bodyParser.json());
app.use(requestLogger);
app.post('/signin', onUserLoginValidation, login);
app.post('/signup', onUserCreateValidation, createUser);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
