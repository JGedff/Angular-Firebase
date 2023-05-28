import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  actualPage: Number = 1;

  @Output() pageSelected = new EventEmitter<any>();

  constructor() {

  }

  selectPage(page: Number) {
    this.pageSelected.emit(page);
    this.actualPage = page;
  }
}
