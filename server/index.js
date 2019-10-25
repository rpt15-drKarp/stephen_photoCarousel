const rewrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const Images = require('../database/Image.js');
const db = require('../database/Image.js');
const cors = require('cors');
const compression = require('compression');
const dbApis = require('../database/models/APIs.js');

const app = express();

let envDb = process.env.DB;
console.log('database:', envDb);
console.log('environment:', process.env.NODE_ENV);

app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/:gameId', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());


// Josh's endpoint
app.get('/api/aboutImage/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  // console.log('HERE IS THE GAMEID ---> ', gameId)
  if (gameId === '1') {
    Images.findOne({ gameId }).exec((err, results) => {
      if (err) {
        console.error(err);
      } else {
        const imageUrl = results.imageUrl
        res.json(imageUrl);
      }
    });
  } else {
    res.send('http://lorempixel.com/600/105/food/');
  }
})

// Stephens' endpoint
app.get('/api/overviewImage/:gameId', (req, res) => {
  let gameId = req.params.gameId;
  if (gameId === '1') {
    let gameId = '2';
    Images.findOne({ gameId }).exec((err, results) => {
      if (err) {
        console.error(err);
      } else {
        const imageUrl = results.imageUrl;
        res.json(imageUrl);
      }
    });
  } else {
    res.send('http://lorempixel.com/689/387/food/')
  }
});

app.get('/api/images/:gameId/', (req, res) => {
  const game_name = req.params.game_name;
  const gameId = req.params.gameId;
  console.log('gameId', gameId);
  // use to authenticate loader.io
  if (gameId === 'loaderio-4ec099633c4b6110bd51cbcb43dbcc48') {
    res.send('loaderio-4ec099633c4b6110bd51cbcb43dbcc48')
  } else {
    if (envDb === 'mongo') {
      Images.find({}).where('gameId').gt(2).lt(18).sort({ gameId: 1}).exec((err, results) => {
        if (err) {
          console.error(err);
        } else {
          // const imageUrl = results.imageUrl;
          res.json(results);
        }
      });
    } else {
      dbApis.getOne(gameId, (err, result) => {
        if (err) {
          throw err;
        } else {
          // console.log('successfully got game data', result);
          res.send(result);
        }
      });
    }
  }

});

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// GET all endpoint
app.get('/api/images', (req, res) => {
  dbApis.getAll((results) => {
    res.send(results);
  });
});

// POST one endpoints
app.post('/api/images', (req, res) => {
  res.setHeader('access-control-allow-origin', '*');
  dbApis.postOne(req.body, (err, data) => {
    if (err) {
      console.log('error while saving:', err);
      res.status(500);
      res.send('error saving game');
    } else {
      res.status(201);
      res.send('saved successfully');
    }
  });
});

// PUT endpoint
app.put('/api/images', (req, res) => {
  // arguments must be gameId,column name, and update value
  dbApis.put(gameId, colName, val);
});

// DELETE endpoint
app.delete('/api/images/:gameId', (req, res) => {
  dbApis.delete(gameId);
});


let port = 3002;

if (process.env.NODE_ENV === 'prod') {
  port = 80;
}

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});