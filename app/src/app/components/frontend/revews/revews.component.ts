import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-revews',
  templateUrl: './revews.component.html',
  styleUrls: ['./revews.component.css']
})
export class RevewsComponent {

  @Input() user: any;
  @Input() revewData: any;
  @Output() load = new EventEmitter<any>();
  
  clicked: boolean = false;
  eliminated: boolean = false;

  constructor(private _firebaseService: FirebaseService, private _toastrService: ToastrService) {

  }

  deleteRevew() {
    this._firebaseService.delRevewInfo(this.revewData);

    this._firebaseService.delRevew(this.revewData)
      .then(() => {
        this.eliminated = true;

        this.load.emit("Load");
        this._toastrService.success("The revew was deleted", "Delete revew");
      })
      .catch(error => {
        this._toastrService.error("The revew wasn't deleted:\n" + error.message, "Delete revew error: " + error.code);
      })
  }

  updateRevew(object: any) {
    this.revewData.content = object.content;
    this.revewData.stars = object.stars;
  }
}
