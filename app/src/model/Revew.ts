export class Revew {
    userName: String;
    gameCode: String;
    gameTitle: String;
    stars: Number;
    content: String;

    constructor(userName: String, gameCode: String, gameTitle: String, stars: Number, content: String) {
        this.userName = userName;
        this.gameCode = gameCode;
        this.gameTitle = gameTitle;
        this.stars = stars;
        this.content = content;
    }
}