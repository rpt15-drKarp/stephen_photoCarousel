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
   - [1.1 API Endpoints](#1.1-api-end-points)
2. [Development Setup](#development-setup)
   - [2.1 MySQL Setup](#2.1-mysql-setup)
   - [2.2 Riak Setup](#2.2-riak-setup)
   - [2.3 React Build Setup](#2.3-react-build-setup)
3. [Log](#log)
   - [3.1 Development Setup](#3.1-development-setup)

## 1. Usage
This service is part of a game page on the Steam website.

This service is the photo carousel component of the page which will give the users the ability to scroll through different screenshots from the game.

### 1.1 API End Points
 - `GET /api/images/:gameId` 
   - returns all images that are relevant to a specific game
 - `POST /api/images/:gameId`
   - adds more images to the photo carousel of a specific game
 - `PUT /api/images/:gameId`
   - replaces an image in the photo carousel of a specific game
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
test

### 2.1 MySQL Setup

### 2.2 Riak Setup

### 2.3 React Build Setup

## 3. Log

### 3.1 Development Setup
