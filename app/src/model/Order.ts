export class Order {
    code: string;
    date: string;
    userName: string;
    destination: string;
    gameCode: string;
    gameTitle: string;
    amount: number;
    descount: number;

    constructor(code: string, date: string, userName: string, destination: string, gameCode: string, gameTitle: string,
        amount: number, descount: number) {
            this.code = code;
            this.date = date;
            this.userName = userName;
            this.destination = destination;
            this.gameCode = gameCode;
            this.gameTitle = gameTitle;
            this.amount = amount;
            this.descount = descount;
    }
}