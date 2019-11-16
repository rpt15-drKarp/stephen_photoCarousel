const dbM = require('../mysql/index.js');
const dbC = require('../cassandra/index.js');

let envDb = process.env.DB;
let images = {
  "image1": "http://lorempixel.com/600/337/animals/1",
  "image2": "http://lorempixel.com/600/337/animals/2",
  "image3": "http://lorempixel.com/600/337/animals/3",
  "image4": "http://lorempixel.com/600/337/animals/4",
  "image5": "http://lorempixel.com/600/337/animals/5",
  "image6": "http://lorempixel.com/600/337/animals/6",
  "image7": "http://lorempixel.com/600/337/animals/7",
  "image8": "http://lorempixel.com/600/337/animals/8",
  "image9": "http://lorempixel.com/600/337/animals/9",
  "image10": "http://lorempixel.com/600/337/animals/10"
};

module.exports = {
  getOne: (gameId, callback) => {
    let startTime = Date.now();
    if (envDb === 'mySql') {
      let partition = '';
      if (gameId < 1000000) {
        partition = 'p0';
      } else if (gameId < 2000000) {
        partition = 'p1';
      } else if (gameId < 3000000) {
        partition = 'p2';
      } else if (gameId < 4000000) {
        partition = 'p3';
      } else if (gameId < 5000000) {
        partition = 'p4';
      } else if (gameId < 6000000) {
        partition = 'p5';
      } else if (gameId < 7000000) {
        partition = 'p6';
      } else if (gameId < 8000000) {
        partition = 'p7';
      } else if (gameId < 9000000) {
        partition = 'p8';
      } else if (gameId < 10000000) {
        partition = 'p9';
      } else if (gameId < 11000000) {
        partition = 'p10';
      }

      let queryString = `SELECT * FROM games PARTITION (${partition}) WHERE game_id = '${gameId}'`;
      // let queryString = `SELECT * FROM games WHERE game_id = '${gameId}'`;

      dbM.pool.query(queryString, function(err, results) {
        connection.release();
        if (err) {
          throw err;
        } else {
          // console.log('RESULTS --->', results);
          console.log('query duration:', Date.now() - startTime + 'ms');
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
        dbM.pool.releaseConnection();
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
  postOne: (gameData, callback) => {
    if (envDb === 'mySql') {
      let queryString = 'INSERT INTO games (game_name, images) VALUES (?, ?)';
      let queryArgs = [];
      queryArgs.push(gameData.gameName);
      queryArgs.push(JSON.stringify(images));

      // console.log('*****queryArgs', queryArgs);

      dbM.pool.query(queryString, queryArgs, (err, results) => {
        if (err) {
          throw err;
        } else {
          // console.log('saved one to mysql db');
          callback(err, results);
        }
      });
    } else if (envDb === 'cassandra') {
      let queryString = 'INSERT INTO photo_carousel.games (game_id, game_name, images) VALUES (?, ?, ?)';
      let queryArgs = [1, 'testPost']
      queryArgs.push(images);

      dbC.client.execute(queryString, queryArgs, { prepare: true }, (err, results) => {
        if (err) {
          throw err;
        } else {
          // console.log('saved one to cassandra db');
          callback(err, results);
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