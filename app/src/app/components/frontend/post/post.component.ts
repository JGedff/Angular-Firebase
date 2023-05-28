import { Component, Input } from '@angular/core';
import { Comment } from "src/model/Comment";
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() postData: any;

  openPost: Boolean = false;
  loadComments: Boolean = false;

  arrayComments: Comment[] = [];

  protected id: String = "";

  constructor(private _firebaseService: FirebaseService) {
  }
  
  commentsShowHide(): void {
    this.openPost = !(this.openPost);
    
    if (!this.loadComments) {
      this.loadComments = true;
      
      this.id = this.postData.idPost;
      
      this.loadCommentsInfo();
    }
  }

  loadCommentsInfo(): void {

    this._firebaseService.getCommentsPost(this.postData.idPost)
      .then(array => {

        array.forEach((element: any) => {

          this.arrayComments.push({
            idComment: element.id,
            ...element.data()
          })
        });
      });
  }

  loadNewComment(comment: any) {
    this.arrayComments.push(comment);
  }
}
