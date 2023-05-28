import { Component, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Post } from 'src/model/Post';
import { Category } from 'src/model/Category';

import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  @Output() load = new EventEmitter<any>();

  form: FormGroup;

  arrayCategories: Category[] = [];

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService) {

    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      userName: ['', Validators.required],
      category: ['', Validators.required]
    });

    this._firebaseService.getCategories()
      .then((array) => {

        array.forEach((element: any) => {

          this.arrayCategories.push({
            name: element.data().name
          })
        });
      });
  }

  createPost() {

    const POST: Post = {
      idPost: "",
      title: this.form.value.title,
      content: this.form.value.content,
      likes: 0,
      visits: 0,
      amountComments: 0,
      userName: this.form.value.userName,
      category: this.form.value.category
    }

    this._firebaseService.addPost(POST);

    this.load.emit(POST);
  }
}
