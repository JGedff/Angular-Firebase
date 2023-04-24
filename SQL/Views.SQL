/* EXECUTE THIS SCRIPT PROCEDURE BY PROCEDURE AND METHOD MY METHOD. IT WILL BE AN ERROR IF YOU DO NOT DO IT LIKE THAT */

/* VIEWS FUNCTIONS */
/* GET FROM A USER */
CREATE FUNCTION userRevews(@p_userName VARCHAR(40))
RETURN TABLE
	RETURN SELECT r.stars, r.comment, u.userName, u.profileImage
			FROM revew r
			INNER JOIN users u ON u.nif = r.user
			INNER JOIN game g ON g.barCode = r.game
			WHERE u.userName = @p_userName
GO;

/* GET FROM A GAME */
CREATE FUNCTION gameRevews(@p_title VARCHAR(80))
RETURN TABLE
	RETURN SELECT r.stars, r.comment, u.userName, u.profileImage
			FROM revew r
			INNER JOIN users u ON u.nif = r.users
			INNER JOIN game g ON g.barCode = r.game
			WHERE g.title = @p_title
GO;

CREATE FUNCTION gamePlatform(@p_barCode CHAR(15))
RETURN TABLE
	RETURN SELECT p.name, gp.releasingDate, gp.cover
			FROM game_platform gp
			INNER JOIN platform p ON p.idPlatform = gp.platform
			WHERE gp.game = @p_barCode
GO;

CREATE FUNCTION gameGenre(@p_barCode CHAR(15))
RETURN TABLE
	RETURN SELECT ge.name, ge.simbol
			FROM genre ge
			INNER JOIN game ga ON ga.genre = ge.idGenre
			WHERE ga.barCode = @p_barCode
GO;

CREATE FUNCTION gamePegi(@p_title VARCHAR(80))
RETURN TABLE
	RETURN SELECT 'PEGI 'p.name, p.images
			FROM game g
			INNER JOIN pegi p ON p.idPegi = g.pegi
			WHERE g.title = @p_title
GO;

/* SEARCH ORDERS */
CREATE FUNCTION order_by_postalCode(@p_postalCode CHAR(5))
RETURN TABLE
	RETURN SELECT o.date, o.vip, o.state, c.name, a.postalCode, a.addresss
			FROM users u
			INNER JOIN orders o ON o.users = u.nif
			INNER JOIN country c ON c.idCountry = o.destination
			INNER JOIN address a ON a.idAddress = c.address
			WHERE a.postalCode = @p_postalCode
GO;

CREATE FUNCTION order_by_country(@p_country VARCHAR(45))
RETURN TABLE
	RETURN SELECT o.date, o.vip, o.state, c.name, a.postalCode, a.addresss
			FROM users u
			INNER JOIN orders o ON o.users = u.nif
			INNER JOIN country c ON c.idCountry = o.destination
			INNER JOIN address a ON a.idAddress = c.address
			WHERE c.name like '%'@p_country'%'
GO;

CREATE FUNCTION order_by_user(@p_barCode CHAR(15))
RETURN TABLE
	RETURN SELECT o.date, o.vip, o.state, c.name, a.postalCode, a.addresss
			FROM users u
			INNER JOIN orders o ON o.users = u.nif
			INNER JOIN country c ON c.idCountry = o.destination
			INNER JOIN address a ON a.idAddress = c.address
			WHERE og.game = @p_barCode
GO;

CREATE FUNCTION order_by_game(@p_barCode CHAR(15))
RETURN TABLE
	RETURN SELECT o.date, o.vip, o.state, c.name, a.postalCode, a.addresss
			FROM order_game
			INNER JOIN orders o ON o.orderNumber = og.orders
			INNER JOIN country c ON c.idCountry = o.destination
			INNER JOIN address a ON a.idAddress = c.address
			WHERE og.game = @p_barCode
GO;

/* SEARCH GAME */
CREATE FUNCTION game_by_title(@p_gameTitle VARCHAR(80))
RETURN TABLE
	RETURN SELECT g.title, g.description, g.multiplayer, g.price, g.numberRevews, g.avgRevews
			FROM game g
			WHERE g.title like '%'@p_gameTitle'%'
GO;

CREATE FUNCTION game_by_stars(@p_avgStars DECIMAL(3,2))
RETURN TABLE
	RETURN SELECT g.barCode, avgRevews
			FROM game g
			INNER JOIN revew r ON r.game = g.barCode
			GROUP BY g.barCode
			HAVING avgRevews >= @p_avgStars
GO;

CREATE FUNCTION game_by_code(@p_barCode CHAR(15))
RETURN TABLE
	RETURN SELECT g.title, g.description, g.multiplayer, g.price, g.numberRevews, g.avgRevews
			FROM game g
			WHERE g.barCode = @p_barCode
GO;

CREATE FUNCTION game_by_pegi(@p_pegi CHAR(3))
RETURN TABLE
	RETURN SELECT g.barCode, g.title, g.description, g.multiplayer, g.price, g.numberRevews, g.avgRevews
			FROM pegi p
			INNER JOIN game g ON g.pegi = p.idPegi
			WHERE p.name = @p_pegi
GO;

CREATE FUNCTION game_by_genre(@p_genre VARCHAR(80))
RETURN TABLE
	RETURN SELECT ga.barCode, ga.title, ga.description, ga.multiplayer, ga.price, ga.numberRevews, ga.avgRevews
			FROM genre ge
			INNER JOIN game ga ON ga.genre = ge.idGenre
			WHERE ge.name = @p_genre
GO;

CREATE FUNCTION game_by_platform(@p_platform VARCHAR(80))
RETURN TABLE
	RETURN SELECT g.barCode, g.title, g.description, g.multiplayer, g.price, g.numberRevews, g.avgRevews
			FROM game_platform gp
			INNER JOIN platform p ON p.idPlatform = gp.platform
			INNER JOIN game g ON g.barCode = gp.game
			WHERE p.name = @p_platform
GO;

CREATE FUNCTION game_by_order(@p_order CHAR(10))
RETURN TABLE
	RETURN SELECT g.barCode, g.title, g.description, g.multiplayer, g.price, g.numberRevews, g.avgRevews
			FROM order_game og
			INNER JOIN game g ON g.barCode = og.game
			WHERE og.orders = @p_order
GO;

/* SEARCH POSTS */
CREATE FUNCTION posts_by_user(@p_user CHAR(9))
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN users u ON u.nif = p.users
			INNER JOIN category c ON c.idCategory = p.category
			WHERE u.nif = @p_user
GO;

CREATE FUNCTION posts_by_category(@p_category VARCHAR(45))
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE c.name = @p_category
GO;

CREATE FUNCTION posts_by_title(@p_title VARCHAR(40))
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.title like @p_title
GO;

CREATE FUNCTION posts_by_likes(@p_likes INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.likes = @p_likes
GO;

CREATE FUNCTION posts_more_than_likes(@p_likes INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.likes >= @p_likes
GO;

CREATE FUNCTION posts_less_than_likes(@p_likes INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.likes <= @p_likes
GO;

CREATE FUNCTION posts_by_dislikes(@p_dislikes INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.dislikes = @p_dislikes
GO;

CREATE FUNCTION posts_more_than_dislikes(@p_dislikes INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.dislikes >= @p_dislikes
GO;

CREATE FUNCTION posts_less_than_dislikes(@p_dislikes INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.dislikes <= @p_dislikes
GO;

CREATE FUNCTION posts_by_comments(@p_comments INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.comments = @p_comments


CREATE FUNCTION posts_more_than_comments(@p_comments INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.comments >= @p_comments
GO;

CREATE FUNCTION posts_less_than_comments(@p_comments INT)
RETURN TABLE
	RETURN SELECT u.userName, p.title, p.content, p.likes, p.dislikes, p.numberComments, c.name
			FROM post p
			INNER JOIN category c ON c.idCategory = p.category
			INNER JOIN users u ON u.nif = p.users
			WHERE p.comments <= @p_comments
GO;

/* SEARCH COMMENTS */
CREATE FUNCTION comments_by_user(@p_user CHAR(9))
RETURN TABLE
	RETURN SELECT u.userName, c.content, c.likes, c.dislikes, p.title, us.userName , cat.name
			FROM comment c
			INNER JOIN users u ON u.nif = c.users
			INNER JOIN post p ON p.idPost = c.post
			INNER JOIN users us ON us.nif = p.user
			INNER JOIN category cat ON cat.idCategory = p.category
			WHERE u.nif = @p_user
GO;

CREATE FUNCTION comments_by_post(@p_idPost INT)
RETURN TABLE
	RETURN SELECT u.userName, c.content, c.likes, c.dislikes
			FROM comment c
			INNER JOIN users u ON u.nif = c.users
			WHERE c.post = @p_idPost
GO;

CREATE FUNCTION comments_by_likes(@p_likes INT)
RETURN TABLE
	RETURN SELECT u.userName, c.content, c.likes, c.dislikes, p.title, us.userName , cat.name
			FROM comment c
			INNER JOIN users u ON u.nif = c.users
			INNER JOIN post p ON p.idPost = c.post
			INNER JOIN users us ON us.nif = p.user
			INNER JOIN category cat ON cat.idCategory = p.category
			WHERE c.likes = @p_likes
GO;

CREATE FUNCTION comments_more_than_likes(@p_likes INT)
RETURN TABLE
	RETURN SELECT u.userName, c.content, c.likes, c.dislikes, p.title, us.userName , cat.name
			FROM comment c
			INNER JOIN users u ON u.nif = c.users
			INNER JOIN post p ON p.idPost = c.post
			INNER JOIN users us ON us.nif = p.user
			INNER JOIN category cat ON cat.idCategory = p.category
			WHERE c.likes >= @p_likes
GO;

CREATE FUNCTION comments_less_than_likes(@p_likes INT)
RETURN TABLE
	RETURN SELECT u.userName, c.content, c.likes, c.dislikes, p.title, us.userName , cat.name
			FROM comment c
			INNER JOIN users u ON u.nif = c.users
			INNER JOIN post p ON p.idPost = c.post
			INNER JOIN users us ON us.nif = p.user
			INNER JOIN category cat ON cat.idCategory = p.category
			WHERE c.likes <= @p_likes
GO;

CREATE FUNCTION comments_by_dislikes(@p_dislikes INT)
RETURN TABLE
	RETURN SELECT u.userName, c.content, c.likes, c.dislikes, p.title, us.userName , cat.name
			FROM comment c
			INNER JOIN users u ON u.nif = c.users
			INNER JOIN post p ON p.idPost = c.post
			INNER JOIN users us ON us.nif = p.user
			INNER JOIN category cat ON cat.idCategory = p.category
			WHERE c.dislikes = @p_dislikes
GO;

CREATE FUNCTION comments_more_than_dislikes(@p_dislikes INT)
RETURN TABLE
	RETURN SELECT u.userName, c.content, c.likes, c.dislikes, p.title, us.userName , cat.name
			FROM comment c
			INNER JOIN users u ON u.nif = c.users
			INNER JOIN post p ON p.idPost = c.post
			INNER JOIN users us ON us.nif = p.user
			INNER JOIN category cat ON cat.idCategory = p.category
			WHERE c.dislikes >= @p_dislikes
GO;

CREATE FUNCTION comments_less_than_dislikes(@p_dislikes INT)
RETURN TABLE
	RETURN SELECT u.userName, c.content, c.likes, c.dislikes, p.title, us.userName , cat.name
			FROM comment c
			INNER JOIN users u ON u.nif = c.users
			INNER JOIN post p ON p.idPost = c.post
			INNER JOIN users us ON us.nif = p.user
			INNER JOIN category cat ON cat.idCategory = p.category
			WHERE c.dislikes <= @p_dislikes
GO;

/* SEARCH USER */
CREATE FUNCTION user_by_nif(@p_nif CHAR(9))
RETURNS TABLE
	RETURN SELECT nif, email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE nif = @p_nif

CREATE FUNCTION user_by_email(@p_email VARCHAR(80))
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE email like '%'@p_email'%'

CREATE FUNCTION user_by_userName(@p_name VARCHAR(40))
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE userName like '%'@p_name'%'

CREATE FUNCTION user_by_birthdate(@p_year INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE YEAR(birthdate) = @p_year

CREATE FUNCTION user_by_posts(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberPosts = @p_posts

CREATE FUNCTION user_more_than_posts(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberPosts >= @p_posts

CREATE FUNCTION user_less_than_posts(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberPosts <= @p_posts

CREATE FUNCTION user_by_comments(@p_comment INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberComments = @p_comment

CREATE FUNCTION user_more_than_comments(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberComments >= @p_posts

CREATE FUNCTION user_less_than_comments(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberComments <= @p_posts

CREATE FUNCTION user_by_likes(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberLikes = @p_posts

CREATE FUNCTION user_more_than_likes(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberLikes >= @p_posts

CREATE FUNCTION user_less_than_likes(@p_posts VARCHAR(80))
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberLikes <= @p_posts

CREATE FUNCTION user_by_dislikes(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberDisikes = @p_posts

CREATE FUNCTION user_more_than_dislikes(@p_posts INT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberDislikes >= @p_posts

CREATE FUNCTION user_less_than_dislikes(@p_posts VARCHAR(80))
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE numberDislikes <= @p_posts

CREATE FUNCTION user_by_vip(@p_vip BIT)
RETURNS TABLE
	RETURN SELECT email, userName, birthdate, sex, creditCard, numberPosts, numberComments, numberDislikes, numberLikes, userVip, profileImage
			FROM users
			WHERE vip = @p_vip