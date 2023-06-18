import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/model/Game';
import { Genre } from 'src/model/Genre';
import { Pegi } from 'src/model/Pegi';
import { Platform } from 'src/model/Platform';
import { Post } from 'src/model/Post';
import { User } from 'src/model/User';

import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  page: number = 1;

  user: any;

  arrayPosts: Post[] = [];
  arrayGames: Game[] = [];
  arrayPegis: Pegi[] = [];
  arrayPlatforms: Platform[] = [];
  arrayGenres: Genre[] = [];

  ngOnInit(): void {
    const userInformation = sessionStorage.getItem('app.user');
    let page = Number(sessionStorage.getItem('app.page'))
    
    if (page) {
      this.changePage(page);
    }

    if(userInformation) {
      let oneUser = false;
      let userId = JSON.parse(userInformation);
      let userInfo: User;

      this.user = this._firebaseService.getUserId(userId)
        .then(array => {
          array.forEach((element: any) => {
            if (!oneUser) {
              oneUser = true;

              userInfo = {
                userId: element.data().userId,
                email: element.data().email,
                userName: element.data().userName,
                password: element.data().password,
                totalLikes: element.data().totalLikes,
                totalDislikes: element.data().totalDislikes,
                totalPosts: element.data().totalPosts,
                totalComments: element.data().totalComments,
                totalRevews: element.data().totalRevews,
                admin: element.data().admin,
              }
            }
          });
        })
        .finally(() => {
          this.user = userInfo;
        })
    }
  }

  constructor(private _firebaseService: FirebaseService, private _toastrService: ToastrService) {

  }

  changePage(pages: any) {
    this.page = pages;

    sessionStorage.setItem('app.page', this.page.toString());

    if (this.page == 2 && this.arrayGames.length <= 0) {
      this.loadGamesInfo();
    }

    if (this.page == 3 && this.arrayPosts.length <= 0) {
      this.loadPostsInfo();
    }
  }

  loadPosts(input: any): void {
    this.arrayPosts = [];

    this._firebaseService.getPosts()
      .then(array => {

        array.forEach((element: any) => {

          this.arrayPosts.push({
            idPost: element.id,
            ...element.data()
          });
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error loading the posts:\n' + error.message, 'Posts error: ' + error.code);
      });
  }

  loadPostsInfo(): void {

    this._firebaseService.getPosts()
      .then(array => {

        array.forEach((element: any) => {

          this.arrayPosts.push({
            idPost: element.id,
            ...element.data()
          });
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error loading the posts:\n' + error.message, 'Posts error: ' + error.code);
      });
  }

  loadGames(input: any): void {
    this.loadGamesInfo();
  }

  loadGamesInfo(): void {
    this.arrayGames = [];
    this.arrayPegis = [];
    this.arrayGenres = [];
    this.arrayPlatforms = [];

    this.loadGamesObjects();
    this.loadPegis();
    this.loadPlatforms();
    this.loadGenres();
  }

  loadGamesObjects() {
    this._firebaseService.getGames()
      .then(array => {

        array.forEach((element: any) => {

          this.arrayGames.push({
            barCode: element.id,
            ...element.data()
          });
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error loading the games:\n' + error.message, 'Game error: ' + error.code);
      });
  }

  loadPegis() {
    this._firebaseService.getPegis()
      .then(array => {
        array.forEach((doc: any) => {
          let PEGI: Pegi = {
            name: doc.data().name
          }
          
          this.arrayPegis.push(PEGI);
        });
      })
      .catch(error => {
        this._toastrService.error("There was an error loading:\n" + error.message, 'Error loading pegi: ' + error.code);
      });
  }

  loadPlatforms() {
    this._firebaseService.getPlatforms()
      .then(array => {
        array.forEach((doc: any) => {
          let PLATFORM: Platform = {
            name: doc.data().name
          }

          this.arrayPlatforms.push(PLATFORM);
        });
      })
      .catch(error => {
        this._toastrService.error("There was an error loading:\n" + error.message, 'Error loading platform: ' + error.code);
      });
  }

  loadGenres() {
    this._firebaseService.getGenres()
      .then(array => {
        array.forEach((doc: any) => {
          let GENRE: Genre = {
            name: doc.data().name
          }

          this.arrayGenres.push(GENRE);
        });
      })
      .catch(error => {
        this._toastrService.error("There was an error loading:\n" + error.message, 'Error loading genre: ' + error.code);
      });
  }

  loadNewPost(post: any) {
    this.arrayPosts.push(post);
  }

  loadNewGame(game: any) {
    this.arrayGames.push(game);
  }

  changeUser(user: any) {
    this.user = user;
  }
}
