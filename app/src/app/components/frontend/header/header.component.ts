import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  actualPage: number = 1;

  @Output() pageSelected = new EventEmitter<any>();
  @Input() user: any;

  ngOnInit(): void {
    let page = Number(sessionStorage.getItem('app.page'));

    if(page) {
      this.actualPage = page;
    }
  }

  constructor() {

  }

  selectPage(page: number) {
    this.actualPage = page;
    this.pageSelected.emit(page);
  }
}
