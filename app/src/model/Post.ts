export class Post {
    idPost: String;
    title: String;
    content: String;
    likes: Number;
    visits: Number;
    amountComments: Number;
    userName: String;
    category: String;

    constructor(idPost: String, title: String, content: String, likes: Number, visits: Number, amountComments: Number,
        userName: String, category: String) {
            this.idPost = idPost;
            this.title = title;
            this.content = content;
            this.likes = likes;
            this.visits = visits;
            this.amountComments = amountComments;
            this.userName = userName;
            this.category = category;
    }
}