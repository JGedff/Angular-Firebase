export class Order {
    code: String;
    date: String;
    userName: String;
    destination: String;
    gameCode: String;
    gameTitle: String;
    amount: Number;
    descount: Number;

    constructor(code: String, date: String, userName: String, destination: String, gameCode: String, gameTitle: String,
        amount: Number, descount: Number) {
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