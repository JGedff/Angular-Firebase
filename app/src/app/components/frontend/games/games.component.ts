import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Revew } from 'src/model/Revew';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent{

  @Output() load = new EventEmitter<any>();
  @Input() gameData: any;
  @Input() user: any;

  seeRevews: boolean = false;
  loadRevews: boolean = false;
  eliminated: boolean = false;

  arrayRevews: Revew[] = [];

  constructor(private _firebaseService: FirebaseService, private _toastrService: ToastrService) {

  }

  revewsShowHide(): void {
    this.seeRevews = !(this.seeRevews);

    if (!(this.loadRevews)) {
      this.loadRevews = true;
      
      this.loadRevewsInfo();
    }
  }

  loadRevew(load: string) {
    this.arrayRevews = [];

    this.loadRevewsInfo();
  }

  loadRevewsInfo() {

    this._firebaseService.getRevewsGameCode(this.gameData.barCode)
      .then(array => {

        array.forEach((element: any) => {
          
          this.arrayRevews.push({
            userName: element.data().userName,
            ...element.data()
          })
        });
      })
      .catch(error => {
        this._toastrService.success('There was an error loading the revews:\n' + error.message, 'Game error: ' + error.code);
      });
  }

  loadNewRevew(revew: any) {
    this.arrayRevews.push(revew);
  }

  eliminateGame() {
    this._firebaseService.delGameInfo(this.gameData);

    this._firebaseService.delGame(this.gameData.barCode)
      .then(() => {
        this.eliminated = true;

        this.load.emit("Load");
        this._toastrService.success("The game was deleted", "Delete game");
      })
      .catch(error => {
        this._toastrService.error("The game wasn't deleted:\n" + error.message, "Delete game error: " + error.code);
      });
  }

  updateGame(object: any) {
    this.gameData.title = object.title
    this.gameData.description = object.description
    this.gameData.multiplayer = object.multiplayer
    this.gameData.price = object.price
    this.gameData.stock = object.stock
    this.gameData.pegi = object.pegi
    this.gameData.platform = object.platform
    this.gameData.genre = object.genre
    this.gameData.releasingDate = object.releasingDate
  }
}
