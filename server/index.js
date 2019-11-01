import newrelic from 'newrelic';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ImageCarousel from '../client/src/Components/ImageCarousel.jsx';
import dbApis from '../database/models/APIs.js';
import Images from '../database/Image.js';
import db from '../database/Image.js';
// import seedCassandra from '../database/cassandra/seed.js';

// const rewrelic = require('newrelic');
// const express = require('express');
// const bodyParser = require('body-parser');
// const Images = require('../database/Image.js');
// const db = require('../database/Image.js');
// const cors = require('cors');
// const compression = require('compression');
// const dbApis = require('../database/models/APIs.js');
// const seedCassandra = require('../database/cassandra/seed.js');

const app = express();

let envDb = process.env.DB;
console.log('db being used:', envDb);

// app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/:gameId', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.get('/*', (req, res) => {
  const jsx = <ImageCarousel />;
  const reactDom = renderToString(jsx);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlTemplate(reactDom));
})

const htmlTemplate = function(reactDom) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Photo Carousel</title>
      <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
      <div id="photogallery">${reactDom}</div>
      <script src="../assets/app.bundle.js"></script>
    </body>
    </html>
  `
};

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
    dbApis.getOne(gameId, (result) => {
      // console.log('successfully got game data', result);
      res.send(result);
    });
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

const port = 3002;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});