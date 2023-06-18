import { Component, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  @Input() user: any;

  form: FormGroup;

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {
    this.form = this.fb.group({
      content: ['', Validators.required],
      stars: ['', [ Validators.required, Validators.max(5), Validators.min(0) ] ]
    });
  }

  createRevew() {
    try {
      const REVEW: Revew = {
        id: "",
        userName: this.user.userName,
        gameCode: this.game.barCode,
        gameTitle: this.game.title,
        stars: this.form.value.stars,
        content: this.form.value.content
      }
  
      this._firebaseService.addRevew(REVEW);
      
      this.load.emit(REVEW);

      this._toastrService.success("The revew was created successfuly", "Add revew");
    }
    catch (e: any) {
      this._toastrService.error("The revew wasn't created:\n" + e.message, "Add revew error: " + e.code);
    }
  }
}
