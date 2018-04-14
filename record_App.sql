DROP DATABASE IF EXISTS record_app;
CREATE DATABASE record_app;

\c record_app;

CREATE TABLE users(
	userID SERIAL PRIMARY KEY,
	userName TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	firstName TEXT NOT NULL,
	lastName TEXT NOT NULL
);

CREATE TABLE reviews(
	reviewID SERIAL PRIMARY KEY,
	userID INTEGER NOT NULL REFERENCES users(userID),
	artist_name TEXT NOT NULL,
	album_name TEXT NOT NULL,
	spotify_artist_ID TEXT NOT NULL,
	spotify_album_ID TEXT NOT NULL,
	review_text TEXT NOT NULL,
	date_time timestamp
);

CREATE TABLE album_ratings(
  spotify_album_ID TEXT,
  userID INTEGER NOT NULL REFERENCES users(userID) ON DELETE CASCADE,
  rating SMALLINT NOT NULL,
  PRIMARY KEY (spotify_album_ID, userID)
);