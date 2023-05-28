export class User {
    code: String;
    userName: String;
    amountPosts: Number;
    amountComments: Number;
    amountRevews: Number;
    amountLikes: Number;
    userVip: Boolean;
    profileImage: String;

    constructor(code: String, userName: String, amountPosts: Number, amountComments: Number, amountRevews: Number,
        amountLikes: Number, userVip: Boolean, profileImage: String) {
            this.code = code;
            this.userName = userName;
            this.amountPosts = amountPosts;
            this.amountComments = amountComments;
            this.amountRevews = amountRevews;
            this.amountLikes = amountLikes;
            this.userVip = userVip;
            this.profileImage = profileImage;
    }
}