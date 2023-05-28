export class Comment {
    idComment: String;
    idPost: String;
    content: String;
    likes: Number;
    visits: Number;
    userName: String;

    constructor(idComment: String, idPost: String, content: String, likes: Number, visits: Number, userName: String) {
        this.idComment = idComment;
        this.idPost = idPost;
        this.content = content;
        this.likes = likes;
        this.visits = visits;
        this.userName = userName;
    }
}