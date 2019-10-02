DROP DATABASE photoCarousel;

CREATE DATABASE IF NOT EXISTS photoCarousel;

USE photoCarousel;

DROP TABLE IF EXISTS games;

CREATE TABLE games (
  game_id INT NOT NULL AUTO_INCREMENT,
  game_name VARCHAR(100) NOT NULL,
  images TEXT NOT NULL,
  PRIMARY KEY (game_id)
);