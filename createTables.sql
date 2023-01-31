CREATE TABLE movie(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description TEXT,
    duration INT NOT NULL,
    price INT NOT NULL
);

INSERT INTO
	movies(name, description, duration, price)
VALUES
	('Start', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2, 300)
;

INSERT INTO
	movies(name, description, duration, price)
VALUES
	('American Pie', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1, 1230)
;

SELECT 
	*
FROM 
	movies;

SELECT 
	MIN(price) mais_barato
FROM
	movies;

SELECT 
	MAX(price) mais_caro
FROM
	movies;

SELECT 
	AVG(price) media_preco
FROM 
	movies;

SELECT 
	COUNT(*) filmes_longos
FROM
	movies
WHERE 
	duration >= 2;

SELECT 
	*
FROM 
	movies
LIMIT 3 OFFSET 0;

SELECT 
	*
FROM 
	movies 
ORDER BY
	duration DESC;

SELECT 
	COUNT(*) filmes_longos, name, duration 
FROM
	movies
WHERE 
	duration > 1
GROUP BY 
	name, duration ;
	
SELECT 
	*
FROM 
	movies 
WHERE 
	price = (
		SELECT 
			MAX(price) mais_caro
		FROM
			movies
	);
-- ALTER TABLE movie RENAME TO movies;

