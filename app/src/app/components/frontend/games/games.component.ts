import { Component, Input } from '@angular/core';
import { Revew } from 'src/model/Revew';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent{

  @Input() gameData: any;

  seeRevews: Boolean = false;
  loadRevews: Boolean = false;

  arrayRevews: Revew[] = [];

  constructor(private _firebaseService: FirebaseService) {

  }

  revewsShowHide(): void {
    this.seeRevews = !(this.seeRevews);

    if (!(this.loadRevews)) {
      this.loadRevews = true;
      
      this.loadRevewsInfo();
    }
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
      });
  }

  loadNewRevew(revew: any) {
    this.arrayRevews.push(revew);
  }
}
