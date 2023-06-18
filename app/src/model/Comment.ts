export class Comment {
    idComment: string;
    idPost: string;
    content: string;
    likes: number;
    dislikes: number;
    userName: string;

    constructor(idComment: string, idPost: string, content: string, likes: number, dislikes: number, userName: string) {
        this.idComment = idComment;
        this.idPost = idPost;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.userName = userName;
    }
}