const db = require('./index.js');
const faker = require('faker');

const seedData = async (numOfData) => {
  console.log('start time', new Date().toLocaleTimeString());
  let globalCounter = 0;
  let imageCounter = 0;

  const queryString = `INSERT INTO games (game_id, game_name, images) VALUES (?, ?, ?)`;
  let queryArgs = [];

  while (globalCounter < 10000000) {
    for (let i = 0; i < numOfData; i += 10) {
      queryArgs = [];

      for (let x = 1; x < 11; x++) {
        let gameId = i + 1;
        let tempArr = [];
        // create values for extended inserts
        tempArr.push(gameId++);
        // create game name
        tempArr.push(faker.lorem.word());
        let imageObj = {};
        // use this counter to make 1000 images
        // create 10 images and add to object
        for (let i = 0; i < 10; i++) {
          if (imageCounter === 1000) {
            imageCounter = 0;
          }

          imageCounter++;
          let key = 'image' + i;
          imageObj[key] = `http://lorempixel.com/600/337/animals/${key}`;
        }
        tempArr.push(imageObj);
        queryArgs.push(tempArr);
      }

      let queries = [
        { query: queryString, params: queryArgs[0]},
        { query: queryString, params: queryArgs[1]},
        { query: queryString, params: queryArgs[2]},
        { query: queryString, params: queryArgs[3]},
        { query: queryString, params: queryArgs[4]},
        { query: queryString, params: queryArgs[5]},
        { query: queryString, params: queryArgs[6]},
        { query: queryString, params: queryArgs[7]},
        { query: queryString, params: queryArgs[8]},
        { query: queryString, params: queryArgs[9]},
      ];

      try {
        await db.client.batch(queries, { prepare: true })
        // await db.client.execute(queryString, queryArgs, { prepare: true })
        // await db.executeConcurrent(db.client, queryString, queryArgs, { prepare: true, concurrencyLevel: 10000 })
        .then (() => {
          globalCounter += 10;
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

seedData(1000);
// console.log(db);
    // console.log('node memory:', process.memoryUsage().heapUsed)
