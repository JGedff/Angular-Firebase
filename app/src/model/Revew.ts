export class Revew {
    id: string;
    userName: string;
    gameCode: string;
    gameTitle: string;
    stars: number;
    content: string;

    constructor(id: string, userName: string, gameCode: string, gameTitle: string, stars: number, content: string) {
        this.id = id;
        this.userName = userName;
        this.gameCode = gameCode;
        this.gameTitle = gameTitle;
        this.stars = stars;
        this.content = content;
    }
}