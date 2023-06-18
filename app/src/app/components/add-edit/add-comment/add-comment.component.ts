import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase/firebase.service';

import { Comment } from 'src/model/Comment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {

  @Output() load = new EventEmitter<any>();
  @Input() postId: any;
  @Input() user: any;

  form: FormGroup;

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {

    this.form = this.fb.group({
      content: ['', Validators.required]
    })
  }

  createComment() {
    
    try {
      const COMMENT: Comment = {
        idComment: "",
        idPost: this.postId,
        content: this.form.value.content,
        likes: 0,
        dislikes: 0,
        userName: this.user.userName,
      }

      this._firebaseService.addComment(COMMENT);

      this.load.emit(COMMENT);

      this.form.reset();

      this._toastrService.success("The comment was created successfuly", "Add comment");
    }
    catch (e: any) {
      this._toastrService.error("The comment wasn't created:\n" + e.message, "Add comment error: " + e.code);
    }
  }
}
