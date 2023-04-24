/* EXECUTE THIS SCRIPT PROCEDURE BY PROCEDURE AND METHOD MY METHOD. IT WILL BE AN ERROR IF YOU DO NOT DO IT LIKE THAT */

/* DELETE PROCEDURES */
CREATE PROCEDURE delete_comment(@p_comment CHAR(40))
AS
BEGIN

	DECLARE @v_likes INT
	DECLARE @v_user CHAR(9)
	DECLARE @v_dislikes INT
	DECLARE @v_idPost CHAR(40)

	SELECT @v_user = users, @v_idPost = post, @v_likes = likes, @v_dislikes = dislikes
	FROM comment
	WHERE idComment = @p_comment

	DELETE FROM comment
	WHERE idComment = @p_comment

	UPDATE post
	SET numberComments = numberComments - 1
	WHERE idPost = @v_idPost

	UPDATE users
	SET numberComments = numberComments - 1, numberDislikes = numberDislikes - @v_dislikes, numberLikes = numberLikes - @v_likes
	WHERE nif = @v_user

END
GO;

CREATE PROCEDURE delete_post(@p_post CHAR(40))
AS
BEGIN

	DECLARE @v_likes INT
	DECLARE @v_media INT
	DECLARE @v_dislikes INT
	DECLARE @v_user CHAR(9)
	DECLARE @v_comment VARCHAR(40)

	DECLARE c_comment CURSOR FOR (
		SELECT idComment, users, likes, dislikes
		FROM comment
		WHERE post = @p_post
	)

	OPEN c_comment
	FETCH c_comment INTO @v_comment

	WHILE @@FETCH_STATUS = 0 BEGIN
		EXEC dbo.delete_comment @v_comment

		FETCH c_comment INTO @v_comment, @v_user, @v_likes, @v_dislikes	
	END

	CLOSE c_coment
	DEALLOCATE c_comment

	SELECT @v_user = users, @v_likes = likes, @v_dislikes = dislikes, @v_media = media
	FROM post
	WHERE idPost = @p_post

	DELETE FROM media
	WHERE idMedia = @v_media

	DELETE FROM post
	WHERE idPost = @p_post

	UPDATE dbo.users
	SET numberPosts = numberPosts - 1, numberLikes = numberLikes - @v_likes, numberDislikes = numberDislikes - @v_dislikes
	WHERE nif = @v_user

END
GO;

CREATE PROCEDURE delete_order(@v_number CHAR(10))
AS
BEGIN

	DELETE FROM order_game
	WHERE orders = @v_number

	DELETE FROM orders
	WHERE orderNumber = @v_number

END

CREATE PROCEDURE delete_revew(@p_user CHAR(9), @p_game CHAR(15))
AS
BEGIN
	DECLARE @v_avgRevew DECIMAL(3,2)

	DELETE FROM revew
	WHERE users = @p_user AND game = @p_game

	SELECT @v_avgRevew = AVG(r.stars)
	FROM game g
	INNER JOIN revew r ON r.game = g.barCode

	UPDATE game
	SET numberRevews = numberRevews - 1, avgRevews = @v_avgRevew
	WHERE barCode = @p_game

END
GO;

CREATE PROCEDURE delete_user(@p_user CHAR(9))
AS
BEGIN

	DECLARE @v_game CHAR(15)
	DECLARE @v_order CHAR(10)
	DECLARE @v_post VARCHAR(40)
	DECLARE @v_profileImage INT
	DECLARE @v_userRevew CHAR(9)
	DECLARE @v_comment VARCHAR(40)

	DECLARE c_comments CURSOR FOR (
		SELECT idComment
		FROM comment
		WHERE users = @p_user
	)

	DECLARE c_posts CURSOR FOR (
		SELECT idPost
		FROM post
		WHERE users = @p_user
	)

	DECLARE c_order CURSOR FOR (
		SELECT orderNumber
		FROM orders
		WHERE users = @p_user
	)

	DECLARE c_revew CURSOR FOR (
		SELECT game
		FROM revew
		WHERE users = @p_user
	)

	OPEN c_comments
	FETCH c_comments INTO @v_comment

	WHILE @@FETCH_STATUS = 0 BEGIN
		EXEC delete_comment @v_comment

		FETCH c_comments INTO @v_comment
	END

	CLOSE c_comments
	DEALLOCATE c_comments

	OPEN c_posts
	FETCH c_posts INTO @v_post

	WHILE @@FETCH_STATUS = 0 BEGIN
		EXEC delete_post @v_post

		FETCH c_posts INTO @v_post
	END

	CLOSE c_posts
	DEALLOCATE c_posts

	OPEN c_order
	FETCH c_order INTO @v_order

	WHILE @@FETCH_STATUS = 0 BEGIN
		EXEC delete_order @v_order

		FETCH c_order INTO @v_order
	END

	CLOSE c_order
	DEALLOCATE c_order

	OPEN c_revew
	FETCH c_revew INTO @v_game

	WHILE @@FETCH_STATUS = 0 BEGIN
		EXEC detele_revew @p_user, @v_order

		FETCH c_revew INTO @v_game
	END

	CLOSE c_revew
	DEALLOCATE c_revew

	SELECT profileImage
	FROM users
	WHERE nif = @p_user

	DELETE FROM media
	WHERE idMedia = @v_profileImage

	DELETE FROM usres
	WHERE nif = @p_user

END
GO;

CREATE PROCEDURE delete_category(@p_category INT)
AS
BEGIN

	DECLARE @v_undefinedCategory INT = 1

	UPDATE post
	SET category = @v_undefinedCategory
	WHERE category = @p_category

	DELETE FROM category
	WHERE idCategory = @p_category

END
GO;

CREATE PROCEDURE delete_game(@p_game CHAR(15))
AS
BEGIN

	DECLARE @v_order CHAR(10)
	DECLARE @v_cover INT

	DECLARE c_orderGame CURSOR FOR (
		SELECT orders
		FROM order_game
		WHERE game = @p_game
	)

	OPEN c_orderGame
	FETCH c_orderGame INTO @v_order

	WHILE @@FETCH_STATUS = 0 BEGIN
		UPDATE orders
		SET state = 'C'
		WHERE orderNumber = @v_order

		FETCH c_orderGame INTO @v_order
	END

	CLOSE c_orderGame
	DEALLOCATE c_orderGame

	SELECT @v_cover = cover
	FROM game_platform
	WHERE game = @p_game

	DELETE FROM revew
	WHERE game = @p_game

	DELETE FROM order_game
	WHERE game = @p_game

	DELETE FROM media
	WHERE idMedia = @v_cover

	DELETE FROM game_platform
	WHERE game = @p_game

	DELETE FROM game
	WHERE barCode = @p_game

END
GO;

CREATE PROCEDURE delete_platform(@p_platform INT)
AS
BEGIN

	DECLARE @v_cover INT

	DECLARE c_platform CURSOR FOR (
		SELECT cover
		FROM game_platform
		WHERE platform = @p_platform
	)

	OPEN c_platform
	FETCH c_platform INTO @v_cover

	WHILE @@FETCH_STATUS = 0 BEGIN
		DELETE FROM media
		WHERE idMedia = @v_cover

		FETCH c_platform INTO @v_cover
	END

	DELETE FROM game_platform
	WHERE platform = @p_platform

	DELETE FROM platform
	WHERE idPlatform = @p_platform

END
GO;

/* CANCEL PROCEDURES */
CREATE PROCEDURE cancel_order(@v_number CHAR(10))
AS
BEGIN

	DELETE FROM order_game
	WHERE orders = @v_number

	UPDATE orders
	SET state = 'C'
	WHERE orderNumber = @v_number

END
GO;