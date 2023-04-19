const routerMovie = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

routerMovie.get('/movies', getMovies);

routerMovie.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(80),
    director: Joi.string().required().min(2).max(80),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(20),
    description: Joi.string().required().min(2),
    image:  Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/),
    trailer:  Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/),
    nameRU: Joi.string().required().min(2).max(100),
    nameEN: Joi.string().required().min(2).max(100),
    thumbnail:  Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/),
    movieId: Joi.objectId().required(),
  }),
}), createMovie);

routerMovie.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
}), deleteMovie);

module.exports = routerMovie;
