const cassandra = require('cassandra-driver');
const executeConcurrent = cassandra.concurrent.executeConcurrent

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'photo_carousel'
});

client.connect(function (err) {
  if (err) {
    console.log('error in connecting to cassandra:', err);
  } else {
    console.log('connected to cassandra');
  }
});

