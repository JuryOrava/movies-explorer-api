const jwt = require('jsonwebtoken');
const ClientError = require('../errors/client-err');

const handleAuthError = (res, next) => {
  next(new ClientError('Необходима авторизация'));
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res, next);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-films-secret');
  } catch (err) {
    return handleAuthError(res, next);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
