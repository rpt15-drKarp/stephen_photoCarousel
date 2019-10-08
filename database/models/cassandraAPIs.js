const db = require('../cassandra/index.js');

module.exports = {
  games: {
    get: (callback) => {
      let queryString = 'SELECT * FROM photo_carousel.games';

      db.client.execute(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log('RESULTS --->', results);
          callback(null, results);
        }
      });
    },
    postOne: (game) => {
      let queryString = 'INSERT INTO photo_carousel.games (game_id, game_name, images) VALUES (?, ?, ?)';

      db.client.execute(queryString, game, () => {
        if (err) {
          throw err;
        } else {
          console.log('saved one to cassandra db');
        }
      })
    },
    put: (gameId, colName, val) => {
      let queryString = `UPDATE photo_carousel.games SET ? = ? WHERE game_id = ${gameId}`;
      let queryArgs = [];
        queryArgs.push(colName);
        queryArgs.push(val);

      db.client.execute(queryString, queryArgs, function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log('RESULTS --->', results);
          // callback(null, results);
        }
      });
    },
    delete: (gameId) => {
      let queryString = 'DELETE FROM photo_carousel.games WHERE game_id = ?';

      db.client.execute(queryString, gameId, function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log('RESULTS --->', results);
          callback(null, results);
        }
      });
    }
  }
};