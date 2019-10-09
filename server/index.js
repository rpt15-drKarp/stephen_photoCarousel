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
console.log('db being used:', envDb);

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
    res.send(dbApis.getOne((result) => {
      res.send(result);
    }));
  }
});

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// GET all endpoint
app.get('/api/images', (req, res) => {
  // console.log('results from GET in server:', dbApis.getAll());
  dbApis.getAll((results) => {
    res.send(results);
  });
});

// POST One endpoints
app.post('/api/images', (req, res) => {
  dbApis.postOne(req.body);
});

// PUT endpoint
app.put('/api/images', (req, res) => {
  // arguments must be gameId,column name, and update value
  // need to get it from req.body maybe?
  dbApis.put(gameId, colName, val);
});

// DELETE endpoint
app.delete('/api/images/:gameId', (req, res) => {
  dbApis.delete(gameId);
});

const port = 3002;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

