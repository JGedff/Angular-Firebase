import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-revews',
  templateUrl: './revews.component.html',
  styleUrls: ['./revews.component.css']
})
export class RevewsComponent {

  @Input() revewData: any;

  constructor() {

  }
}
