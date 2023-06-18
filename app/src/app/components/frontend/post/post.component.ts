import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comment } from "src/model/Comment";
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Output() load = new EventEmitter<any>();
  @Input() postData: any;
  @Input() user: any;

  loadC: boolean = false;
  openPost: boolean = false;
  touchedLike: boolean = false;
  touchedDislike: boolean = false;
  eliminated: boolean = false;

  arrayComments: Comment[] = [];

  id: string = "";

  constructor(private _firebaseService: FirebaseService, private _toastrService: ToastrService) {

  }
  
  commentsShowHide(): void {
    this.openPost = !(this.openPost);
    
    if (!this.loadC) {
      this.loadC = true;
      
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
      })
      .catch(error => {
        this._toastrService.error('There was an error loading the posts:\n' + error.message, 'Posts error: ' + error.code);
      });
  }

  loadNewComment(comment: any) {
    this.arrayComments.push(comment);
  }

  loadComments(input: any) {
    this.arrayComments = [];

    this._firebaseService.getCommentsPost(this.postData.idPost)
      .then(array => {

        array.forEach((element: any) => {

          this.arrayComments.push({
            idComment: element.id,
            ...element.data()
          })
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error loading the posts:\n' + error.message, 'Posts error: ' + error.code);
      });
  }

  eliminatePost() {
    this._firebaseService.restUserInfo(this.postData);

    this._firebaseService.delPost(this.postData.idPost)
      .then(() => {
        this.eliminated = true;

        this.load.emit("Load");
        this._toastrService.success("The post wasdeleted", "Delete post");
      })
      .catch(error => {
        this._toastrService.error("The post wasn't deleted:\n" + error.message, "Delete post error: " + error.code);
      });
  }

  addLike() {
    this._firebaseService.addLikePost(this.postData.idPost);

    this.postData.likes++; 

    if (this.postData.userName == this.user.userName) {
      this.user.totalDislkes++;
    }

    this.touchedLike = true;
  }

  addDislike() {
    this._firebaseService.addDislikePost(this.postData.idPost);

    this.postData.dislikes++;

    if (this.postData.userName == this.user.userName) {
      this.user.totalDislikes++;
    }

    this.touchedDislike = true;
  }

  update(object: any) {
    this.postData.title = object.title;
    this.postData.content = object.content;
    this.postData.category = object.category;
  }
}
