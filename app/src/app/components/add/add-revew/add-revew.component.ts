import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Revew } from 'src/model/Revew';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-add-revew',
  templateUrl: './add-revew.component.html',
  styleUrls: ['./add-revew.component.css']
})
export class AddRevewComponent {
  
  @Output() load = new EventEmitter();
  @Input() game: any;

  form: FormGroup;

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      content: ['', Validators.required],
      stars: ['', [ Validators.required, Validators.max(5), Validators.min(0) ] ]
    });
  }

  createRevew() {

    const REVEW: Revew = {
      userName: this.form.value.userName,
      gameCode: this.game.gameCode,
      gameTitle: this.game.gameTitle,
      stars: this.form.value.stars,
      content: this.form.value.content
    }

    this._firebaseService.addRevew(REVEW)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
    
    this.load.emit(REVEW);
  }
}
