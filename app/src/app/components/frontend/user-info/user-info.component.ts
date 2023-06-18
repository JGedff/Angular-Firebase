import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/model/User';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  @Input() user: any;
  @Output() data = new EventEmitter<any>();

  constructor() {

  }

  logOut() {
    sessionStorage.clear();

    this.data.emit(undefined);
  }
}