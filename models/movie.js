const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function isValidLink(v) { return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/.test(v); },
      message: 'Неправильный формат почты',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: function isValidLink(v) { return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/.test(v); },
      message: 'Неправильный формат почты',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: function isValidLink(v) { return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/.test(v); },
      message: 'Неправильный формат почты',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }],
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
});

module.exports = mongoose.model('movie', movieSchema);
