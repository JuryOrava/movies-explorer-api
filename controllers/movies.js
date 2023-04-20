const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err'); // 404
const BadRequesrError = require('../errors/bad-request-err'); // 400
const ForbiddenError = require('../errors/forbidden-err'); // 403

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequesrError('Переданы некорректные данные при создании карточки.'));
      }
      next(new Error());
    });
};
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

function deleteValidMovie(req, res, next) {
  Movie.findByIdAndRemove(req.params.movieId)
    .then((thisMovie) => {
      res.send(thisMovie);
    })
    .catch(next);
}

module.exports.deleteMovie = (req, res, next) => {
  const userId = { userId: req.user._id };
  Movie.findById(req.params.movieId)
    .orFail(() => {
      next(new NotFoundError(`Передан несуществующий _id:${req.params.movieId} карточки.`));
    })
    .then((movie) => {
      if (userId.userId === movie.owner._id.toString()) {
        deleteValidMovie(req, res, next);
      } else {
        next(new ForbiddenError(`Карточка с _id:${req.params.movieId} не Ваша. Ай-яй-яй.`));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequesrError(`Карточка с указанным _id:${req.params.movieId} не найдена.`));
      }
      next(new Error());
    });
};
