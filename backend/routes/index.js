const router = require('express').Router();
const NotFoundError = require('../errors/NotFound');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { onUserCreateValidation, onUserLoginValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.post('/signin', onUserLoginValidation, login);
router.post('/signup', onUserCreateValidation, createUser);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницае найдена'));
});

module.exports = router;
