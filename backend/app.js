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
  optionsSuccessStatus: 200,
};
const app = express();
app.use(cors(allowedCors));
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
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
