CREATE KEYSPACE photo_carousel WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3'};

DROP TYPE IF EXISTS photo_carousel.images_all;

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

DROP TABLE IF EXISTS photo_carousel.games;

CREATE TABLE photo_carousel.games (
  game_id int PRIMARY KEY,
  game_name text,
  images FROZEN<images_all>
);