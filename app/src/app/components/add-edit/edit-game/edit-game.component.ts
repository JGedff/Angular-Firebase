import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Genre } from 'src/model/Genre';
import { Pegi } from 'src/model/Pegi';
import { Platform } from 'src/model/Platform';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent {

  @Input() dataGame: any;
  @Output() load = new EventEmitter<any>();

  form: FormGroup;
  edit: boolean = false;
  loadArray: boolean = false;

  arrayPegi: Pegi[] = [];
  arrayGenre: Genre[] = [];
  arrayPlatform: Platform[] = [];

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {

    this.form = this.fb.group({
      title: [''],
      description: [''],
      multiplayer: ['', Validators.required],
      price: [''],
      stock: [''],
      pegi: ['', Validators.required],
      platform: ['', Validators.required],
      genre: ['', Validators.required],
      releasingDate: ['']
    });
  }

  loadInfo() {
    this._firebaseService.getPegis()
      .then(array => {
        array.forEach((peg: any) => {
          this.arrayPegi.push({
            name: peg.data().name
          });
        });
      });

    this._firebaseService.getGenres()
      .then(array => {
        array.forEach((gen: any) => {
          this.arrayGenre.push({
            name: gen.data().name
          });
        });
      });

    this._firebaseService.getPlatforms()
      .then(array => {
        array.forEach((pla: any) => {
          this.arrayPlatform.push({
            name: pla.data().name
          });
        });
      });
  }

  formEdit() {
    this.edit = !this.edit;

    if (!this.loadArray) {
      this.loadArray = !this.loadArray;

      this.loadInfo();
    }
  }

  revewUpdate() {
    let title = "";
    let description = "";
    let price = "";
    let stock = "";
    let releasingDate = "";

    if (this.form.value.title != '') {
      title = this.form.value.title;
    }
    else {
      title = this.dataGame.title;
    }

    if (this.form.value.description != '') {
      description = this.form.value.description;
    }
    else {
      description = this.dataGame.description;
    }

    if (this.form.value.price != '') {
      price = this.form.value.price;
    }
    else {
      price = this.dataGame.price;
    }

    if (this.form.value.stock != '') {
      stock = this.form.value.stock;
    }
    else {
      stock = this.dataGame.stock;
    }

    if (this.form.value.releasingDate != '') {
      releasingDate = this.form.value.releasingDate;
    }
    else {
      releasingDate = this.dataGame.releasingDate;
    }

    let update = {
      title: title,
      description: description,
      multiplayer: this.form.value.multiplayer,
      price: price,
      stock: stock,
      pegi: this.form.value.pegi,
      platform: this.form.value.platform,
      genre: this.form.value.genre,
      releasingDate: releasingDate
    }

    this._firebaseService.updateGame(this.dataGame.barCode, update)
      .then(() => {
        this.load.emit(update);
        
        this._toastrService.success('The game was updated', 'Game update');
      })
      .catch((error: any) => {
        this._toastrService.error("There was an error updating the game:\n" + error.message, 'Error updating game: ' + error.code);
      })
  }
}
