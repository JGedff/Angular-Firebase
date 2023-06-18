import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent {

  @Input() dataComment: any;
  @Output() load = new EventEmitter<any>();

  form: FormGroup;
  edit: boolean = false;

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {
    this.form = this.fb.group({
      content: ['', Validators.required]
    })
  }

  formEdit() {
    this.edit = !this.edit;
  }

  commentUpdate() {
    let update = {
      content: this.form.value.content
    }

    this._firebaseService.updateComment(this.dataComment.idComment, update)
      .then(() => {
        this.load.emit(update);
        
        this._toastrService.success('The comment was updated', 'Comment update');
      })
      .catch((error: any) => {
        this._toastrService.error("There was an error updating the comment:\n" + error.message, 'Error updating comment: ' + error.code);
      })
  }
}
