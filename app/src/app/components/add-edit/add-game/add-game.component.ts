import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/model/Game';
import { Genre } from 'src/model/Genre';
import { Pegi } from 'src/model/Pegi';
import { Platform } from 'src/model/Platform';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {

  @Input() peg: any;
  @Input() plat: any;
  @Input() gen: any;
  @Output() load = new EventEmitter<any>();
  
  form: FormGroup;
  loadInfo: boolean = false;

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {
    this.form = fb.group({
      barCode: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      multiplayer: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      pegi: ['', Validators.required],
      platform: ['', Validators.required],
      genre: ['', Validators.required],
      releasingDate: ['', Validators.required]
    });
  }

  createComment() {
    try {
      const GAME: Game = {
        barCode: this.form.value.barCode,
        title: this.form.value.title,
        description: this.form.value.description,
        multiplayer: this.form.value.multiplayer,
        price: this.form.value.price,
        stock: this.form.value.stock,
        pegi: this.form.value.pegi,
        platform: this.form.value.platform,
        genre: this.form.value.genre,
        releasingDate: this.form.value.releasingDate,
        cover: '',
        totalRevews: 0,
        averageRevews: 0
      }
  
      this._firebaseService.addGame(GAME);
  
      this.load.emit(GAME);

      this._toastrService.success('The game was created successfuly', 'Add game');
    }
    catch (e:any) {
      this._toastrService.error("The game wasn't created:\n" + e.message, "Add game error: " + e.code);
    }
  }

}
