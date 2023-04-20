const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequesrError = require('../errors/bad-request-err'); // 400
const ConflictingRequestError = require('../errors/conflicting-request-err'); // 409

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictingRequestError('Пользователь с таким Email уже существует!'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequesrError(`Переданы некорректные логин или пароль. ${err.name}`));
      }
      next(new Error());
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequesrError('Переданы некорректные данные при обновлении профиля.'));
      }
      next(new Error());
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-films-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
