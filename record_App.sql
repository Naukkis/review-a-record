DROP DATABASE IF EXISTS record_app;
CREATE DATABASE record_app;

\c record_app;

CREATE TABLE users(
	userID SERIAL PRIMARY KEY,
	userName TEXT NOT NULL,
	password TEXT NOT NULL
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

INSERT INTO users (userName, password)
	VALUES('testUser','test');
	
INSERT INTO reviews (userID, artist_name, album_name, spotify_artist_ID, spotify_album_ID, review_text, date_time)
	VALUES('1', 'Metallica', 'Ride the Lightning', '2ye2Wgw4gimLv2eAKyk1NB', '5rFZcoCvmCaJ1gxTMU4JTm', 'On muuten mahtavaa musaa', current_timestamp);