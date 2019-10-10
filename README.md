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
   - [1.1 CRUD Endpoints](#11-crud-endpoints)
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
   - [3.4 New Relic Setup](#34-new-relic-setup)
   - [3.5 DBMS Benchmarking](#35-dbms-benchmarking)

## 1. Usage
This service is part of a game page on the Steam website.

This service is the photo carousel component of the page that was inherited from a differnet student which will give the users the ability to scroll through different screenshots from the game.

### 1.1 CRUD Endpoints
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

### 2.2 Cassandra Setup
#### Install HomeBrew
`brew install cassandra`

#### Install Python
`brew install python`

#### Install Java
`brew cask install java`

#### Install cql
`pip install cql`
`pip install cassandra-driver`
Installing cassandra-driver will take a few minutes so if it doesn't install immediately, just wait!

If you run into "pip: command not found", then run:
`sudo easy_install pip`

If you run into "ERROR: Cannot uninstall 'six'", then run:
`sudo pip install tld --ignore-installed six`

#### Start/Stop Cassandra
`brew services start cassandra`
`brew services stop cassandra`

#### Cassandra shell
You get into cassandra shell by running `cqlsh`

#### Set up new keyspace and data object in shell
A keyspace in Cassandra is like a database in other RDMS.
I ran:
`CREATE KEYSPACE photo_carousel WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3'};`

I created a UDT (user defined type) to house the 10 images for each game.
```
CREATE TYPE photo_carousel.images_all (
  image1 text,
  image2 text,
  image3 text,
  image4 text,
  image5 text,
  image6 text,
  image7 text,
  image8 text,
  image9 text,
  image10 text
);
```
Then create the table.
```
CREATE TABLE photo_carousel.games (
  game_id int PRIMARY KEY,
  game_name text,
  images FROZEN<images_all>
);
```

#### Connect node to Cassandra database

#### Queries to use with Cassandra

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
> error connecting: Error: connect ETIMEDOU at Connection._handleConnectTimeout

I also increased the speed of the inserts by using extended insert (i.e. INSERT INTO user (id, name) VALUES (1, 'Ben'), (2, 'Bob');)

The issue I continue having even when using async/await is that the await is not resolving. The await is also stopping my for loop.

**ANSWER!**
The reason that my await function wasn't resolving is because I left an error handling function in the argument

So previous code was:
```
await db.pool.query(queryString, queryArgs, (err, result) => {
  if (err) {
    console.log('error in insert query', err);
  } else {
    console.log('success!');
  }
})
```

But I changed it to:
`await db.pool.query(queryString, queryArgs)`

I also had to include try/catch so the final code looked something like:
```
try {
  await db.pool.query(queryString, queryArgs);
} catch (error) {
  console.log('error in catch:', error);
}
```

### 3.3.2 Cassandra Setup
**Errors**
- #### CQLSH Connection Error ('Unable to connect to any servers')
  - Make sure that you start cassandra with `brew services start cassandra` before you try to use cqlsh. Otherwise you will receive the above error
- #### Error: Not enough bytes to read value of component
  - I was initially using a stringified version of my object to pass into the images column but it should've been a plain object.
- #### Error: Target data type could not be guessed
  - I received this error and most of my research was showing that if I use a prepare statement as one of the options in my .execute function, it should solve it. The problem turned out to be that I put "prepared" instead of "prepare".
- #### ReadTimeout: Error from server: code=1200 when using SELECT COUNT(*) FROM photo_carousel.games in cqlsh
  - Counting the number of records in Cassandra is a heavy operation due to its distributed nature. So this is expected unless you make some dits to the connection timeout times.
- #### Parameter "game_id" not defined when trying to use executeConcurrent
  - I used the same query string and query parameters as I was using when doing the single queries but those arguments were not working in executeConcurrent.

#### Cassandra query setup
I initially set up my insert queries for Cassandra using concurrent execution because I thought that simultaneously running the insert queries will make the query faster. But I realized that wasn't the case (or I set it up wrong).
Insert volume | Concurrent Execution | Batch Inserts |
------------- | -------------------- | ------------- |
500,000       | 9 minutes | 1 minute 14 seconds  |
10,000,000    | 1 hour 20 minutes | 14 minutes 50 seconds |

### 3.4 New Relic Setup

### 3.5 DMBS Benchmarking
In order to start load testing each database, I created separate files to house the different queries that will be required for each database.

I also created an environmental variable for the database so that depending on which script I use to start my service, it'll know which database to use.

#### k6 Setup
```
brew tap loadimpact/k6
brew install k6
```

You don't have to npm install any packages.

Create a new js file which looks like this in its most basic form:
```
// testing/loadTests.js

import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  vus: 10,
  duration: "10s"
};
export default function() {
  let res = http.get("http://localhost:3002/api/images");
  check(res, {
    "success": (r) => r.status == 200
  });
};
```

Once you update the above script, run 'k6 run loadTests.js' <- If you're not in the correct folder, make sure to adjust this.

DBMS      | Route | RPS | LATENCY | ERROR RATE |
--------- | ----- | ----- | ----- |
Cassandra | GET | 1    |  |  |
Cassandra | GET | 10   |  |  |
Cassandra | GET | 100  |  |  |
Cassandra | GET | 1000 |  |  |
Cassandra | POST | 1    |  |  |
Cassandra | POST | 10   |  |  |
Cassandra | POST | 100  |  |  |
Cassandra | POST | 1000 |  |  |
MySQL | GET | 1    |  |  |
MySQL | GET | 10   |  |  |
MySQL | GET | 100  |  |  |
MySQL | GET | 1000 |  |  |
MySQL | POST | 1    |  |  |
MySQL | POST | 10   |  |  |
MySQL | POST | 100  |  |  |
MySQL | POST | 1000 |  |  |



