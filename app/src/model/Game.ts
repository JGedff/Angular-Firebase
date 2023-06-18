import { FirebaseService } from "src/services/firebase/firebase.service";

export class Game {
    barCode: string;
    title: string;
    description: string;
    multiplayer: boolean;
    price: number;
    stock: number;
    pegi: string;
    platform: string;
    genre: string;
    releasingDate: string;
    cover: string;
    totalRevews: number;
    averageRevews: number;

    constructor(barCode: string, title: string, description: string, multiplayer: boolean, price: number, stock: number,
        pegi: string, platform: string, genre: string, releasingDate: string, cover: string, totalRevews: number,
        averageRevews: number) {
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
            this.cover = cover,
            this.totalRevews = totalRevews;
            this.averageRevews = averageRevews;
    }
}