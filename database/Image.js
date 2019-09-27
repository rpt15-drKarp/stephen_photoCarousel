const db = require('./index.js');
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    gameId: Number,
    game_name: String,
    imageUrl: String
  });

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;