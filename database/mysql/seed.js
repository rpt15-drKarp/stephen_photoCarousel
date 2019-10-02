const db = require('./index.js');
const faker = require('faker');

/**
 *
 * don't serve media from express (host on s3)
 * do NOT generate 10 million images. Map the 10 million urls in your database to one of approx 1000 real images.
 */



// add fake data to database
const seedData = (numOfData) => {
  console.log('first time check node memory:', process.memoryUsage().heapUsed)
  // INSERT INTO user (id, name) VALUES (1, 'Ben'), (2, 'Bob');
  const queryString = `INSERT INTO games (game_name, images) VALUES
  (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),
  (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),
  (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),
  (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),
  (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)`;

  let queryArgs = [];
  for (let i = 0; i < numOfData; i++) {
    console.log('node memory:', process.memoryUsage().heapUsed)
    // create values for extended inserts
    for (let x = 0; x < 50; x++) {
      // create game name
      queryArgs.push(faker.lorem.word());
      let imageObj = {};
      // create 10 images and add to object
      for (let i = 1; i < 11; i++) {
        let key = 'image' + i;
        imageObj[key] = `http://lorempixel.com/600/337/animals/${key}`;
      }
      queryArgs.push(JSON.stringify(imageObj));
    }


    db.connection.query(queryString, queryArgs, (err, results) => {
      if (err) {
        throw err;
      }
      // else {
        // console.log('RESULTS ---->', results);
        // callback(null, results);
      // }
    })
  }
};

// seed 500,000
seedData(10000);

// seedData(100000);
