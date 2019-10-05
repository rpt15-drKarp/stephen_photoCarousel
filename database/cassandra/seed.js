const db = require('./index.js');
const faker = require('faker');

const seedData = async (numOfData) => {
  let globalCounter = 0;

  const queryString = `INSERT INTO games (game_id, game_name, images) VALUES (?, ?, ?)`;
  let queryArgs = [];

  for (let i = 0; i < numOfData; i++) {
    while (globalCounter < 100) {
      for (let i = 0; i < numOfData; i++) {
        // create values for extended inserts
        queryArgs.push((i + 1).toString());
        // create game name
        queryArgs.push(faker.lorem.word());
        let imageObj = {};
        // use this counter to make 1000 images
        let imageCounter = 0;
        // create 10 images and add to object
        for (let i = 1; i < 11; i++) {
          if (imageCounter === 1000) {
            imageCounter = 0;
          }

          imageCounter++;
          let key = 'image' + imageCounter;
          imageObj[key] = `http://lorempixel.com/600/337/animals/${key}`;
        }
        queryArgs.push(imageObj);
        try {
            await db.client.execute(queryString, queryArgs, { prepare: true })
            .then (() => {
              globalCounter++;
              queryArgs = [];
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
  }
  console.log('global counter:', globalCounter);
  return process.exit();
};

seedData(10000000);
    // console.log('node memory:', process.memoryUsage().heapUsed)
