const mongoose = require('mongoose');
const Image = require('./Image.js');

mongoose.connect('mongodb://localhost/image', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to mongoDB');
});

// GET from db

// POST to db
const save = (images) => {
  let game = new Image(images);
  console.log('gameId that is being saved', game.gameId)
  game.save((err) => {
    if (err) {
      console.log('error while saving to db', err);
    }
  });
};

// PUT to db (will not create new doc if it doesn't exist)
const update = (gameId, updateData) => {
  Image.findByIdAndUpdate(gameId, updateData, (err) => {
    if (err) {
      console.log('error while updating document');
    } else {
      console.log('successfully updated document');
    }
  });
};

// DELETE from db
const deleteData = (gameId) => {
  Image.findByIdAndDelete(gameId, (err, game) => {
    if (err) {
      console.log(`error while deleting ${game}`);
    } else {
      console.log(`successfully deleted ${game}`)
    }
  });
};


module.exports.db = db;
module.exports.save = save;
module.exports.update = update;
module.exports.deleteData = deleteData;
