const mongoose = require('mongoose');
const Image = require('./Image.js');

mongoose.connect('mongodb://localhost/image', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to mongoDB');
});

// GET from db
const retrieve = (gameId, sendData) => {
  Image.find({ game_id: gameId })
    .exec((err, results) => {
      if (err) {
        console.log('error while retrieving data from db:', err);
      } else {
      // console.log('results in mongo retrieve', results);
      sendData(results);
      }
    });
};


// POST to db
// find the game in database and add an image
const save = (gameId, newImage) => {
  // find game in database
  retrieve(gameId, (game) => {
    // check if game has 10 images
    // if it has 10, send message to use PUT to replace an image
    if (game.images.image10 !== '') {
      console.log('Image slots are full. Please replace an existing image');
    } else {
      // if it does not have 10 find the last available slot
      let emptyImage = '';
      for (let i in game.images) {
        if (game.images[i] === '') {
          emptyImage = i;
          break;
        }
      }
      //add image to last available slot
      Image.findOneAndUpdate({ gameId: gameId }, { $set: { emptyImage: newImage}}, (err) => {
        if (err) {
          console.log('error while updating document:', err);
        } else {
          console.log('successfully updated document');
        }
      });
    };
  });
};

// random image number generator
const randomImage = () => {
  let random = Math.floor(Math.random() * 10) + 1;
  return 'image' + random;
};

// PUT to db (will not create new doc if it doesn't exist)
const update = (gameId, replaceImage) => {
  Image.findOneAndUpdate({ gameId: gameId }, { $set: { randomImage: replaceImage }}, (err) => {
    if (err) {
      console.log('error while updating document:', err);
    } else {
      console.log('successfully updated document');
    }
  });
};

// DELETE from db
const deleteData = (gameId) => {
  Image.findOneAndUpdate({ gameId: gameId }, { $set: { randomImage: '' }}, (err) => {
    if (err) {
      console.log('error while deleting image in document:', err);
    } else {
      console.log('successfully deleted one image');
    }
  });
};



module.exports.db = db;
module.exports.retrieve = retrieve;
module.exports.save = save;
module.exports.update = update;
module.exports.deleteData = deleteData;
