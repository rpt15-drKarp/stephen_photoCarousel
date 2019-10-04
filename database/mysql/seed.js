const db = require('./index.js');
const faker = require('faker');

let globalCounter = 0;


const seedData = async (numOfData) => {
  // console.log('first time check node memory:', process.memoryUsage().heapUsed)
  // INSERT INTO user (id, name) VALUES (1, 'Ben'), (2, 'Bob');
  const queryString = `INSERT INTO games (game_name, images) VALUES
    (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),
    (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),
    (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),
    (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?),
    (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)`;

  let queryArgs = [];
  for (let i = 0; i < numOfData; i++) {
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
      // globalCounter++;
    }

    while (globalCounter < 10000000) {
      try {
          await db.pool.query(queryString, queryArgs)
          .then (() => {
            globalCounter += 50;
            // console.log('globalCounter', globalCounter);
            // console.log('success');
          })
          .catch ((err) => {
            console.log('error in catch await:', err);
          });
        } catch (error) {
          console.log('error in catch:', error);
        }
    }
  }
  console.log('global counter:', globalCounter);
  return process.exit();
};

seedData(20000);
    // console.log('node memory:', process.memoryUsage().heapUsed)
