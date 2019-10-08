const db = require('./index.js');
const faker = require('faker');

const seedData = async (numOfData) => {
  console.log('start time', new Date().toLocaleTimeString());
  let globalCounter = 0;

  const queryString = `INSERT INTO games (game_id, game_name, images) VALUES (?, ?, ?)`;
  let queryArgs = [];
  const concurrencyLevel = 1000;

  for (let i = 0; i < numOfData; i++) {
    while (globalCounter < 5000) {
        let tempArr = [];
        // create values for extended inserts
        tempArr.push(i + 1);
        // create game name
        tempArr.push(faker.lorem.word());
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
        tempArr.push(imageObj);
        queryArgs.push(tempArr);

      try {
        // await db.client.execute(queryString, queryArgs, { prepare: true })
        await db.executeConcurrent(db.client, queryString, queryArgs, { prepare: true })
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
  console.log('global counter:', globalCounter);
  console.log('end time', new Date().toLocaleTimeString());
  return process.exit();
};

seedData(5000);
// console.log(db);
    // console.log('node memory:', process.memoryUsage().heapUsed)
