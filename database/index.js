const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/image', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected to mongoDB');
});

// save function

// fetch function

module.exports = db;
