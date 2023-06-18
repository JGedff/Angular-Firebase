export class Post {
    idPost: string;
    title: string;
    content: string;
    likes: number;
    dislikes: number;
    amountComments: number;
    userName: string;
    category: string;

    constructor(idPost: string, title: string, content: string, likes: number, dislikes: number, amountComments: number,
        userName: string, category: string) {
            this.idPost = idPost;
            this.title = title;
            this.content = content;
            this.likes = likes;
            this.dislikes = dislikes;
            this.amountComments = amountComments;
            this.userName = userName;
            this.category = category;
    }
}