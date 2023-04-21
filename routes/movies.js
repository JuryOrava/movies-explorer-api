const routerMovie = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

routerMovie.get('/movies', getMovies);

routerMovie.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/),
    trailerLink: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/),
    movieId: Joi.number().required(),
  }),
}), createMovie);

routerMovie.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
}), deleteMovie);

module.exports = routerMovie;
