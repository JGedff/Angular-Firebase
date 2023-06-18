import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Post } from 'src/model/Post';
import { Category } from 'src/model/Category';

import { FirebaseService } from 'src/services/firebase/firebase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  @Output() load = new EventEmitter<any>();
  @Input() user: any;

  form: FormGroup;

  arrayCategories: Category[] = [];

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {

    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
    });

    this._firebaseService.getCategories()
      .then((array) => {

        array.forEach((element: any) => {

          this.arrayCategories.push({
            name: element.data().name
          })
        });
      })
      .catch(() => {
        this._toastrService.error("There was an error while loading Categories collection", "Categories error");
      });
  }

  createPost() {
    try {

      const POST: Post = {
        idPost: "",
        title: this.form.value.title,
        content: this.form.value.content,
        likes: 0,
        dislikes: 0,
        amountComments: 0,
        userName: this.user.userName,
        category: this.form.value.category
      }
  
      this._firebaseService.addPost(POST);
  
      this.load.emit(POST);

      this._toastrService.success("The post was created successfuly", "Add post");
    }
    catch (e: any) {
      this._toastrService.error("The post wasn't created:\n" + e.message, "Add post error: " + e.code);
    }
  }
}
