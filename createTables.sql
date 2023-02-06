CREATE TABLE movies(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL UNIQUE,
	description TEXT,
    duration INT NOT NULL,
    price INT NOT NULL
);