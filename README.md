# Steam Photo Carousel

> Create a clone of a game page on the Steam website

## Related Projects

  - [overview:3000](https://github.com/rpt15-drKarp/alastair_overview)
  - [reviews:3001](https://github.com/rpt15-drKarp/Richard_Reviews)
  - photoGallery:3002 (current)
  - [aboutGame:3003](https://github.com/rpt15-drKarp/Therese_aboutGame)
  - [proxy:3006](https://github.com/rpt15-drKarp/stephen_proxy)

## Table of Contents

1. [Usage](#Usage)
   - [1.1 API Endpoints](#11-api-end-points)
2. [Development Setup](#development-setup)
   - [2.1 MySQL Setup](#21-mysql-setup)
   - [2.2 Cassandra Setup](#22-cassandra-setup)
   - [2.3 React Build Setup](#23-react-build-setup)
3. [Log](#log)
   - [3.1 Set up CRUD endpoints](#31-set-up-crud-endpoints)
   - [3.2 Set up Jest to test apis](#32-set-up-jest-to-test-apis)
   - [3.3 Development Setup](#33-development-setup)
     - [3.3.1 MySQL Setup](#331-mysql-setup)
     - [3.3.2 Cassandra Setup](#332-cassandra-setup)


## 1. Usage
This service is part of a game page on the Steam website.

This service is the photo carousel component of the page which will give the users the ability to scroll through different screenshots from the game.

### 1.1 API End Points
 - `GET /api/images/:gameId`
   - returns all images that are relevant to a specific game
 - `POST /api/images/:gameId`
   - adds more images to the photo carousel of a specific game
 - `PUT /api/images/:gameId`
   - replaces an image at random in the photo carousel of a specific game
 - `DELETE /api/images/:gameId`
   - deletes an image in the photo carousel of a specific game

 The shape of the data should be as follows:
 ```
 {
   'gameId': Number,
   'gameName: String,
   'images': {
      'image1': String,
      'image2': String,
      'image3': String,
      'image4': String,
      'image5': String,
      'image6': String,
      'image7': String,
      'image8': String,
      'image9': String,
      'image10': String
    }
 }
 ```
## 2. Development Setup

### 2.1 MySQL Setup
1. For macOS users, visit https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation.html for instructions on downloading the .dmg file and installing it.
2. [Install mysql module through npm](https://www.npmjs.com/package/mysql#install)
`npm i --save mysql`
3. Create file to connect app to mySQL database
Example code:
```
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
```
Make sure that the host, user, and password match what you have set up on your local machine.
4. Create schema file
```
DROP DATABASE photoCarousel;

CREATE DATABASE IF NOT EXISTS photoCarousel;

USE photoCarousel;

CREATE TABLE IF NOT EXISTS games (
  gameId INT NOT NULL AUTO_INCREMENT,
  gameName VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY(gameId)
);

CREATE TABLE IF NOT EXISTS images (
  id INT NOT NULL AUTO_INCREMENT,
  gameId INT NOT NULL,
  image1 VARCHAR(255) DEFAULT '',
  image2 VARCHAR(255) DEFAULT '',
  image3 VARCHAR(255) DEFAULT '',
  image4 VARCHAR(255) DEFAULT '',
  image5 VARCHAR(255) DEFAULT '',
  image6 VARCHAR(255) DEFAULT '',
  image7 VARCHAR(255) DEFAULT '',
  image8 VARCHAR(255) DEFAULT '',
  image9 VARCHAR(255) DEFAULT '',
  image10 VARCHAR(255) DEFAULT '',}
  FOREIGN KEY (gameId) REFERENCES games(gameId)
);
```

#### How to connect to MySQL database from command line:
`mysql -u USERNAME -p`
By including -p, it'll prompt **Enter Password**. Enter your password and it'll direct you to the mySQL shell.



#### How to upload mysql schema from file:



### 2.2 Cassandra Setup

### 2.3 React Build Setup

## 3. Log

### 3.1 Set Up CRUD Endpoints
 - `GET /api/images/:gameId`
   - returns all images that are relevant to a specific game
 - `POST /api/images/:gameId`
   - adds more images to the photo carousel of a specific game
   - For this project, I decided to limit the number of images that a game can have to a maximum of 10. Since this is the case, my POST api will take the following steps to add an image to a game:
     1. Retrieve the game data from the database
     2. Check to see if the game already has 10 images
     3. If it has 10 images, then console log that an existing image must be replaced
     4. If it has less than 10 images, then add the new image to the last available image slot
 - `PUT /api/images/:gameId`
   - replaces an image at random in the photo carousel of a specific game
   - I decided to have it randomly replace an image because I wanted to spend more time on optimizing and scaling my database and this appeared to be the simplest solution
 - `DELETE /api/images/:gameId`
   - deletes an image in the photo carousel of a specific game

For my endpoints, since I need to update specific fields, I am using $set for mongoose which allows for that functionality.

### 3.2 Set Up Jest to Test APIs

### 3.3 Development Setup

### 3.3.1 MySQL Setup
**First Issue**
While setting up MySQL I ran into the issue of adding an object as the value in a column. I wanted my image row to contain an object with 10 images. I wasn't sure how I can set up my data so that when I pull from the mySQL database, I'll get an object with 10 images so that I can loop through it. I initially considered using 2 tables and making use of the foreign key to connect them but then I realized that I didn't need to do that. All I needed to do was create the object, use JSON.stringify and then add it as a value like I would anything else.

I started testing my seeding script by seeding them in batches:
10,000
100,000

I used the following query to make sure the rows were successfully added to my database:
> SELECT COUNT(*) FROM games;

**Second Issue**
I received this error:
> error connecting: Error: connect ETIMEDOUT
    at Connection._handleConnectTimeout

### 3.3.2 Cassandra Setup

