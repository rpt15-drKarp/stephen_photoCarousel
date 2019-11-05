const redis = require('redis');

let client = redis.createClient(6379);

client.on('error', function(err){
  console.log('Error connecting to redis:', err)
});

// write to redis
let postOneRedis = (key, value) => {
  client.set(key, value, redis.print);
}

// retrieve from redis
let getOneRedis = (key, callback) => {
  client.get(key, (err, result) => {
    if (err) {
      throw err;
    } else {
      callback(result);
    }
  })
}

// client.set('my test key', 'my test value', redis.print);
// client.get('my test key', function(error, result) {
//   if (error) throw error;
//   console.log('GET result ->', result)
// });

module.exports.postOneRedis = postOneRedis;
module.exports.getOneRedis = getOneRedis;