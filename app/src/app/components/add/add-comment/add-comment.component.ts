import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/services/firebase/firebase.service';

import { Comment } from 'src/model/Comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {

  @Output() load = new EventEmitter<any>();
  @Input() postId: any;

  form: FormGroup;

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService) {

    this.form = this.fb.group({
      content: ['', Validators.required],
      userName: ['', Validators.required]
    })
  }

  createComment() {
    
    const COMMENT: Comment = {
        idComment: "",
        idPost: this.postId,
        content: this.form.value.content,
        likes: 0,
        visits: 0,
        userName: this.form.value.content,
    }

    this._firebaseService.addComment(COMMENT);

    this.load.emit(COMMENT);
  }
}
