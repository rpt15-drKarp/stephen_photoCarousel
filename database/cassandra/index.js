const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'photo_carousel',
  pooling: {
    maxRequestsPerConnection: 32768
  }
});

client.connect(function (err) {
  if (err) {
    console.log('error in connecting to cassandra:', err);
  } else {
    console.log('connected to cassandra');
  }
});

const executeConcurrent = cassandra.concurrent.executeConcurrent;


// const query = 'INSERT INTO games (game_id, game_name, images) VALUES (?, ?, ?)';
// const params = [4, 'test',     {image1: 'http://lorempixel.com/600/337/animals/image1',
// image2: 'http://lorempixel.com/600/337/animals/image2',
// image3: 'http://lorempixel.com/600/337/animals/image3',
// image4: 'http://lorempixel.com/600/337/animals/image4',
// image5: 'http://lorempixel.com/600/337/animals/image5',
// image6: 'http://lorempixel.com/600/337/animals/image6',
// image7: 'http://lorempixel.com/600/337/animals/image7',
// image8: 'http://lorempixel.com/600/337/animals/image8',
// image9: 'http://lorempixel.com/600/337/animals/image9',
// image10: 'http://lorempixel.com/600/337/animals/image10'
// }];

// client.execute(query, params, { prepare: true }, (err) => {
//   if (err) {
//     console.log('error while executing insert:', err);
//   } else {
//     console.log('saved in cassandra');
//   }
// });

module.exports.client = client;
module.exports.executeConcurrent = executeConcurrent;