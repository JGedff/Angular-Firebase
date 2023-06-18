export class User {
    userId: string;
    email: string;
    userName: string;
    password: string;
    totalLikes: number;
    totalDislikes: number;
    totalPosts: number;
    totalComments: number;
    totalRevews: number;
    admin: boolean | 1039;

    constructor(userId: string ,email: string, userName: string, password: string, totalLikes: number, totalDislikes: number, totalPosts: number,
        totalComments: number, totalRevews: number, admin: boolean | 1039) {
            this.userId = userId;
            this.email = email;
            this.userName = userName;
            this.password = password;
            this.totalLikes = totalLikes;
            this.totalDislikes = totalDislikes;
            this.totalPosts = totalPosts;
            this.totalComments = totalComments;
            this.totalRevews = totalRevews;
            this.admin = admin;
    }
}