CREATE DATABASE test;

USE test;

CREATE TABLE genre (
	idGenre INT IDENTITY NOT NULL,
	name VARCHAR(80) NOT NULL,
	simbol INT NOT NULL,

	PRIMARY KEY (idGenre),
	FOREIGN KEY (simbol) REFERENCES media(idMedia)
);

CREATE TABLE platform (
	idPlatform INT IDENTITY NOT NULL,
	name VARCHAR(80) NOT NULL,

	PRIMARY KEY (idPlatform)
);

CREATE TABLE pegi (
	idPegi INT IDENTITY NOT NULL,
	name CHAR(3) NOT NULL,
	images INT NOT NULL,

	PRIMARY KEY (idPegi),
	FOREIGN KEY (images) REFERENCES media(idMedia)
)

CREATE TABLE game (
	barCode CHAR(15) NOT NULL,
	title VARCHAR(80) NOT NULL,
	description TEXT NOT NULL,
	multiplayer BIT NOT NULL,
	price DECIMAL(5,2) NOT NULL,
	stock INT NOT NULL,
	numberRevews INT NOT NULL,
	avgRevews DECIMAL(3,2) NOT NULL,
	pegi CHAR(3) NOT NULL,

	PRIMARY KEY (barCode),
	FOREIGN KEY (cover) REFERENCES media(idMedia),
	FOREIGN KEY (pegi) REFERENCES pegi(idPegi)
);

CREATE TABLE media (
	idMedia INT IDENTITY NOT NULL,
	files VARCHAR(80) NOT NULL,
	altFile VARCHAR(45),

	PRIMARY KEY (idMedia)
);

CREATE TABLE game_platform (
	game CHAR(15) NOT NULL,
	platform INT NOT NULL,
	releasingDate DATETIME NOT NULL,
	cover INT NOT NULL,

	PRIMARY KEY (game, platform),
	FOREIGN KEY (game) REFERENCES game(barCode),
	FOREIGN KEY (platform) REFERENCES platform(idPlatform),
	FOREIGN KEY (cover) REFERENCES media(idMedia)
);

CREATE TABLE users (
	nif CHAR(9) NOT NULL,
	email VARCHAR(80) NOT NULL,
	password VARCHAR(40) NOT NULL,
	userName VARCHAR(40) NOT NULL,
	name VARCHAR(40) NOT NULL,
	surnames VARCHAR(80) NOT NULL,
	birthdate DATE NOT NULL,
	sex CHAR(1),
	creditCard VARCHAR(16) NOT NULL,
	numberPosts INT NOT NULL,
	numberComments INT NOT NULL,
	numberLikes INT NOT NULL,
	numberDislikes INT NOT NULL,
	userVip BIT NOT NULL,
	profileImage INT NOT NULL,

	PRIMARY KEY (nif),
	FOREIGN KEY (profileImage) REFERENCES media(idMedia),
	FOREIGN KEY (country) REFERENCES country(idCountry)
);

CREATE TABLE revew (
	users CHAR(9) NOT NULL,
	game CHAR(15) NOT NULL,
	stars DECIMAL(3,2) NOT NULL,
	comment TEXT,

	PRIMARY KEY (users, game),
	FOREIGN KEY (users) REFERENCES users(nif),
	FOREIGN KEY (game) REFERENCES game(barCode)
);

CREATE TABLE category (
	idCategory INT IDENTITY NOT NULL,
	name VARCHAR(45) NOT NULL,

	PRIMARY KEY (idCategory)
);

CREATE TABLE post (
	idPost VARCHAR(40) NOT NULL,
	title VARCHAR(40) NOT NULL,
	content TEXT NOT NULL,
	likes INT NOT NULL,
	dislikes INT NOT NULL,
	numberComments INT NOT NULL,
	users CHAR(9) NOT NULL,
	media INT NOT NULL,
	category INT NOT NULL,
	
	PRIMARY KEY (idPost),
	FOREIGN KEY (users) REFERENCES users(nif),
	FOREIGN KEY (category) REFERENCES category(idCategory)
);

CREATE TABLE comment (
	idComment VARCHAR(40) NOT NULL,
	content TEXT NOT NULL,
	likes INT NOT NULL,
	dislikes INT NOT NULL,
	post VARCHAR(40) NOT NULL,
	users CHAR(9) NOT NULL,

	PRIMARY KEY (idComment),
	FOREIGN KEY (post) REFERENCES post(idPost),
	FOREIGN KEY (users) REFERENCES users(nif)
);

CREATE TABLE address (
	idAddress INT NOT NULL,
	postalCode CHAR(5) NOT NULL,
	address VARCHAR(80) NOT NULL,

	PRIMARY KEY (idAddress)
)

CREATE TABLE country (
	idCountry INT IDENTITY NOT NULL,
	name VARCHAR(45) NOT NULL,
	address INT NOT NULL,

	PRIMARY KEY (idCountry),
	FOREIGN KEY (address) REFERENCES address(idAddress)
);

CREATE TABLE orders (
	orderNumber CHAR(10) NOT NULL,
	date DATETIME NOT NULL,
	vip BIT NOT NULL,
	state CHAR(1) NOT NULL,
	users CHAR(9) NOT NULL,
	destination INT NOT NULL

	PRIMARY KEY (orderNumber),
	FOREIGN KEY	(users) REFERENCES users(nif),
	FOREIGN KEY (destination) REFERENCES country(idCountry)
);

CREATE TABLE order_game (
	game CHAR(15) NOT NULL,
	orders CHAR(10) NOT NULL,
	cuantity INT NOT NULL,
	descount DECIMAL(3,2) NOT NULL,

	PRIMARY KEY (game, orders),
	FOREIGN KEY (game) REFERENCES game(barCode),
	FOREIGN KEY (orders) REFERENCES orders(orderNumber)
);

INSERT INTO genre(name)
VALUES ('Undefined');

INSERT INTO genre(name)
VALUES ('Action');

INSERT INTO genre(name)
VALUES ('Adventure');

INSERT INTO genre(name)
VALUES ('Survival');

INSERT INTO platform(name)
VALUES ('Undefined');

INSERT INTO platform(name)
VALUES ('Switch');

INSERT INTO platform(name)
VALUES ('PC');

INSERT INTO media(files, altFile)
VALUES ('URL DE PORTADA', 'Skylanders');

INSERT INTO media(files, altFile)
VALUES ('URL IMATGE', 'Crash Bandicoot');

INSERT INTO media(files, altFile)
VALUES ('ProfileImage', 'Profile image');

INSERT INTO media(files, altFile)
VALUES ('URL image post', 'Post 1');

INSERT INTO category(name)
VALUES ('Undefined');

INSERT INTO category(name)
VALUES ('Random');

INSERT INTO address(postalCode, address)
VALUES ('02938', 'A new address');

INSERT INTO address(postalCode, address)
VALUES ('91837', 'Second address');

INSERT INTO country(name)
VALUES ('random place');

INSERT INTO country(name, postalCode, address)
VALUES ('Second place', '91837', 'Second address');

INSERT INTO pegi(name, iamges)
VALUES ('P7', 3);

INSERT INTO pegi(name, iamges)
VALUES ('P14', 4);

INSERT INTO game(barCode, title, description, pegi, multiplayer, price, stock, numberRevews, avgRevews)
VALUES ('C938402837', 'Skylanders', 'It is a really good game...', 2, 0, 0, 14.5, 10, 4);

INSERT INTO game(barCode, title, description, pegi, multiplayer, price, stock, numberRevews, avgRevews)
VALUES ('C029458283', 'Crash', 'Information', 1, 1, 40, 30, 0, 2);

INSERT INTO game_genre(game, genre)
VALUES ('C938402837', 1);

INSERT INTO game_genre(game, genre)
VALUES ('C029458283', 2);

INSERT INTO game_platform(game, platform, releasingDate, cover)
VALUES ('C029458283', 1, '2020-01-05', 2);

INSERT INTO game_platform(game, platform, releasingDate, cover)
VALUES ('C938402837', 2, '2000-12-09', 1);

INSERT INTO users(nif, email, password, userName, name, surnames, birthdate, sex, creditCard, numberPosts, numberComments, numberLikes, numberDislikes, userVip, profileImage)
VALUES ('81927364D', 'test@gmail.com', HASHBYTES('MD5', '123456'), 'User', 'Name', 'Surnames', '2000-01-06', 'U', 'creditcardnumber', 0, 0, 0, 0, 0, 3);

INSERT INTO post(idPost, content, likes, dislikes, numberComments, users, media, category)
VALUES ('1928374747431', 'contentPost1', 0, 0, 0, '81927364D', 4, 1);

INSERT INTO post(idPost, content, likes, dislikes, numberComments, users, media, category)
VALUES ('2423424242', 'contentPost2', 0, 0, 0, '81927364D', 4, 2);

INSERT INTO comment(idComment, content, likes, dislikes, post, users)
VALUES ('99191919191', 'comment1', 0, 0, '2423424242', '81927364D');

INSERT INTO orders(orderNumber, date, vip, state, users)
VALUES ('O12345678', '2012-04-10', 0, 'W', '81927364D');

INSERT INTO order_game(game, orders, cuantity, descount)
VALUES ('C938402837', 'O12345678', 2, 0.0);

INSERT INTO revew(users, game, stars, comment)
VALUES ('81927364D', 'C029458283', 3, 'Not bad, but have errors');