const dbM = require('../mysql/index.js');
const dbC = require('../cassandra/index.js');

let envDb = process.env.DB;

module.exports = {
  getOne: (gameId, callback) => {
    if (envDb === 'mySql') {
      let queryString = `SELECT * FROM games WHERE game_id = ${gameId}`;

      dbM.pool.query(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          // console.log('RESULTS --->', results);
          callback(null, results);
        }
      });
    } else if (envDb === 'cassandra') {
      let queryString = `SELECT * FROM photo_carousel.games WHERE game_id = ${gameId}`;

      dbC.client.execute(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          // console.log('RESULTS --->', results.rows);
          callback(results.rows);
        }
      });
    }
  },
  getAll: (callback) => {
    if (envDb === 'mySql') {
    let queryString = 'SELECT * FROM games LIMIT 100';

    dbM.pool.query(queryString, function(err, results) {
      if (err) {
        throw err;
      } else {
        // console.log('RESULTS --->', results);
        callback(results);
      }
    });
    } else if (envDb === 'cassandra') {
      let queryString = 'SELECT * FROM photo_carousel.games LIMIT 100';

      dbC.client.execute(queryString, function(err, results) {
        if (err) {
          throw err;
        } else {
          // console.log('RESULTS --->', results.rows);
          callback(results.rows);
        }
      });
    }
  },
  postOne: (game) => {
    if (envDb === 'mySql') {
      let queryString = 'INSERT INTO games (game_name, images) VALUES (?, ?)';

      dbM.pool.query(queryString, game, () => {
        if (err) {
          throw err;
        } else {
          console.log('saved one to mysql db');
        }
      });
    } else if (envDb === 'cassandra') {
      let queryString = 'INSERT INTO photo_carousel.games (game_id, game_name, images) VALUES (?, ?, ?)';

      dbC.client.execute(queryString, game, () => {
        if (err) {
          throw err;
        } else {
          console.log('saved one to cassandra db');
        }
      });
    }
  },
  put: (gameId, colName, val) => {
    if (envDb === 'mySql') {
      let queryString = `UPDATE games SET ? = ? WHERE game_id = ${gameId}`;
      let queryArgs = [];
      queryArgs.push(colName);
      queryArgs.push(val);

      dbM.pool.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log('RESULTS --->', results);
          // callback(null, results);
        }
      });
    } else if (envDb === 'cassandra') {
      let queryString = `UPDATE photo_carousel.games SET ? = ? WHERE game_id = ${gameId}`;
      let queryArgs = [];
      queryArgs.push(colName);
      queryArgs.push(val);

      dbC.client.execute(queryString, queryArgs, function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log('RESULTS --->', results);
          // callback(null, results);
        }
      });
    }
  },
  delete: (gameId) => {
    if (envDb === 'mySql') {
      let queryString = 'DELETE FROM games WHERE game_id = ?';

      dbM.pool.query(queryString, gameId, function(err, results) {
        if (err) {
          throw err;
        } else {
          console.log('RESULTS --->', results);
          callback(null, results);
        }
      });
    } else if (envDb === 'cassandra') {
      let queryString = 'DELETE FROM photo_carousel.games WHERE game_id = ?';

      dbC.client.execute(queryString, gameId, function(err, results) {
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
  // mySql: {
  //   getOne: (callback) => {
  //     let queryString = 'SELECT * FROM games';

  //     dbM.pool.query(queryString, function(err, results) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('RESULTS --->', results);
  //         callback(null, results);
  //       }
  //     });
  //   },
  //   getAll: (callback) => {
  //     let queryString = 'SELECT * FROM games';

  //     dbM.pool.query(queryString, function(err, results) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('RESULTS --->', results);
  //         callback(null, results);
  //       }
  //     });
  //   },
  //   postOne: (game) => {
  //     let queryString = 'INSERT INTO games (game_name, images) VALUES (?, ?)';

  //     dbM.pool.query(queryString, game, () => {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('saved one to mysql db');
  //       }
  //     });
  //   },
  //   put: (gameId, updateData) => {
  //     let queryString = `UPDATE games SET ? = ? WHERE game_id = ${gameId}`;
  //     let queryArgs = [];
  //     for (let i in updateData) {
  //       queryArgs.push(i);
  //       queryArgs.push(updateData[i]);
  //     }

  //     dbM.pool.query(queryString, queryArgs, function(err, results) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('RESULTS --->', results);
  //         // callback(null, results);
  //       }
  //     });
  //   },
  //   delete: (gameId) => {
  //     let queryString = 'DELETE FROM games WHERE game_id = ?';

  //     dbM.pool.query(queryString, gameId, function(err, results) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('RESULTS --->', results);
  //         callback(null, results);
  //       }
  //     });
  //   }
  // },
  // cassandra: {
  //   getOne: (callback) => {
  //     let queryString = 'SELECT * FROM photo_carousel.games';

  //     dbC.client.execute(queryString, function(err, results) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('RESULTS --->', results);
  //         callback(null, results);
  //       }
  //     });
  //   },
  //   getAll: (callback) => {
  //     let queryString = 'SELECT * FROM photo_carousel.games';

  //     dbC.client.execute(queryString, function(err, results) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('RESULTS --->', results);
  //         callback(null, results);
  //       }
  //     });
  //   },
  //   postOne: (game) => {
  //     let queryString = 'INSERT INTO photo_carousel.games (game_id, game_name, images) VALUES (?, ?, ?)';

  //     dbC.client.execute(queryString, game, () => {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('saved one to cassandra db');
  //       }
  //     })
  //   },
  //   put: (gameId, colName, val) => {
  //     let queryString = `UPDATE photo_carousel.games SET ? = ? WHERE game_id = ${gameId}`;
  //     let queryArgs = [];
  //     queryArgs.push(colName);
  //     queryArgs.push(val);

  //     dbC.client.execute(queryString, queryArgs, function(err, results) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('RESULTS --->', results);
  //         // callback(null, results);
  //       }
  //     });
  //   },
  //   delete: (gameId) => {
  //     let queryString = 'DELETE FROM photo_carousel.games WHERE game_id = ?';

  //     dbC.client.execute(queryString, gameId, function(err, results) {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('RESULTS --->', results);
  //         callback(null, results);
  //       }
  //     });
  //   }
  // }
