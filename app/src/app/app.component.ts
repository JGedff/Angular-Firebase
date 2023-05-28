import { Component } from '@angular/core';
import { Game } from 'src/model/Game';
import { Post } from 'src/model/Post';

import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  page: Number = 1;

  arrayPosts: Post[] = [];
  arrayGames: Game[] = [];

  constructor(private _firebaseService: FirebaseService) {

  }

  changePage(pages: any) {
    this.page = pages;
  
    if (this.page == 3 && this.arrayPosts.length <= 0) {
      this.loadPostsInfo();
    }

    else if (this.page == 2 && this.arrayGames.length <= 0) {
      this.loadGamesInfo();
    }
  }

  loadPostsInfo(): void {

    this._firebaseService.getPosts()
      .then(array => {

        array.forEach((element: any) => {

          this.arrayPosts.push({
            idPost: element.id,
            ...element.data()
          });
        })
      });
  }

  loadGamesInfo(): void {
    
    this._firebaseService.getGames()
      .then(array => {

        array.forEach((element: any) => {

          this.arrayGames.push({
            barCode: element.id,
            ...element.data()
          });
        })
      });
  }

  loadNewPost(post: any) {
    this.arrayPosts.push(post);
  }
}
