const c_db = require('../mysql/index.js');

module.exports = {
  games: {
    get: (callback) => {
      let queryString = 'SELECT * FROM games';

      db.pool.query(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log('RESULTS --->', results);
          callback(null, results);
        }
      });
    },
    postOne: (game) => {
      let queryString = 'INSERT INTO games (game_name, images) VALUES ()';

      db.pool.query(queryString, game, () => {
        if (err) {
          throw err;
        } else {
          console.log('saved one to cassandra db');
        }
      })
    },
    put: (gameId, updateData) => {
      let queryString = `UPDATE games SET ? = ? WHERE game_id = ${gameId}`;
      let queryArgs = [];
      for (let i in updateData) {
        queryArgs.push(i);
        queryArgs.push(updateData[i]);
      }

      db.pool.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log('RESULTS --->', results);
          // callback(null, results);
        }
      });
    },
    delete: (gameId) => {
      let queryString = 'SELECT * FROM games';

      db.pool.query(queryString, function(err, results) {
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