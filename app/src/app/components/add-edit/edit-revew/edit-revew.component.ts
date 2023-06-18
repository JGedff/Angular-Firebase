import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-edit-revew',
  templateUrl: './edit-revew.component.html',
  styleUrls: ['./edit-revew.component.css']
})
export class EditRevewComponent {

  @Input() dataRevew: any;
  @Output() load = new EventEmitter<any>();

  form: FormGroup;
  edit: boolean = false;

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {
    this.form = this.fb.group({
      content: [''],
      stars: ['', [ Validators.required, Validators.max(5), Validators.min(0) ]]
    })
  }

  formEdit() {
    this.edit = !this.edit
  }

  revewUpdate() {
    let content = "";
    let stars = "";

    if (this.form.value.content == "") {
      content = this.dataRevew.content;
    }
    else {
      content = this.form.value.content;
    }
    
    if (this.form.value.stars == "") {
      stars = this.dataRevew.stars;
    }
    else {
      stars = this.form.value.stars;
    }

    let update = {
      content: content,
      stars: stars
    }

    this._firebaseService.updateRevew(this.dataRevew.id, update)
      .then(() => {
        this.load.emit(update);
        
        this._toastrService.success("The revew was updated", "Update revew");
      })
      .catch((error: any) => {
        this._toastrService.error("There was an error updating the revew:\n" + error.message, 'Error updating revew: ' + error.code);
      })
  }
}
