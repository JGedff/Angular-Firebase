import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent{

  @Output() load = new EventEmitter<any>();
  @Input() commentData: any;
  @Input() user: any;

  eliminated: boolean = false;
  touchedLike: boolean = false;
  touchedDislike: boolean = false;


  constructor(private _firebaseService: FirebaseService, private _toastrService: ToastrService) {

  }

  eliminateComment() {
    this._firebaseService.restUserInfo(this.commentData);

    this._firebaseService.delComment(this.commentData.idComment)
      .then(() => {
        this.eliminated = true;

        this.load.emit("Load");
        this._toastrService.success("The comment was deleted", "Delete comment");
      })
      .catch(error => {
        this._toastrService.error("The comment wasn't deleted:\n" + error.message, "Delete comment error: " + error.code);
      });
  }

  addLike() {
    this._firebaseService.addLikeComment(this.commentData.idComment);

    this.commentData.likes++;

    if (this.commentData.userName == this.user.userName) {
      this.user.totalLikes++;
    }

    this.touchedLike = true;
  }

  addDislike() {
    this._firebaseService.addDislikeComment(this.commentData.idComment);

    this.commentData.dislikes++;

    if (this.commentData.userName == this.user.userName) {
      this.user.totalDislikes++;
    }

    this.touchedDislike = true;
  }

  update(object: any) {
    this.commentData.content = object.content;
  }
}
