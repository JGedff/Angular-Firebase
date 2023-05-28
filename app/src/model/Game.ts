export class Game {
    barCode: String;
    title: String;
    description: String;
    multiplayer: Boolean;
    price: Number;
    stock: Number;
    pegi: Number;
    platform: String;
    genre: String;
    releasingDate: String;
    cover: String;

    constructor(barCode: String, title: String, description: String, multiplayer: Boolean, price: Number, stock: Number,
        pegi: Number, platform: String, genre: String, releasingDate: String, cover: String) {
            this.barCode = barCode;
            this.title = title;
            this.description = description;
            this.multiplayer = multiplayer;
            this.price = price;
            this.stock = stock;
            this.pegi = pegi;
            this.platform = platform;
            this.genre = genre;
            this.releasingDate = releasingDate;
            this.cover = cover
    }
}