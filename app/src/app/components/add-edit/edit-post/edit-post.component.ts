import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {

  @Input() dataPost: any;
  @Output() load = new EventEmitter<any>();

  form: FormGroup
  edit: boolean = false;
  arrayCategories: any = [];

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {
    this.form = fb.group({
      title: [''],
      content: [''],
      category: ['', Validators.required]
    })

    this._firebaseService.getCategories()
      .then(array => {
        array.forEach((cat: any) => {
          this.arrayCategories.push({
            name: cat.data().name
          });
        });
      })
  }

  postUpdate() {
    let title = "";
    let content = "";

    if (this.form.value.title == "") {
      title = this.dataPost.title
    }
    else {
      title = this.form.value.title
    }
    
    if (this.form.value.content == "") {
      content = this.dataPost.content
    }
    else {
      content = this.form.value.content
    }

    let update = {
      title: title,
      content: content,
      category: this.form.value.category,
    }

    this._firebaseService.updatePost(this.dataPost.idPost, update)
      .then(() => {
        this.load.emit(update);
        
        this._toastrService.success('The post was updated', 'Post update');
      })
      .catch((error: any) => {
        this._toastrService.error("There was an error updating the post:\n" + error.message, 'Error updating post: ' + error.code);
      });
  }

  formEdit() {
    this.edit = !this.edit;
  }
}
