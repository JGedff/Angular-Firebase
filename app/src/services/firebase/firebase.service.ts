import { Injectable } from '@angular/core';

import { Firestore, addDoc, collection, getDocs, query, where, setDoc, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';

import { Comment } from 'src/model/Comment';
import { Game } from 'src/model/Game';
import { Order } from 'src/model/Order';
import { Post } from 'src/model/Post';
import { Revew } from 'src/model/Revew';

import { ToastrService } from 'ngx-toastr';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private commentRef;
  private gameRef;
  private orderRef;
  private postRef;
  private revewRef;
  private userRef;
  private categoryRef;
  private platformRef;
  private pegiRef;
  private genreRef;

  constructor(private firestore: Firestore, private _toastrService: ToastrService) {

    this.commentRef = collection(this.firestore, 'comment');
    this.gameRef = collection(this.firestore, 'game');
    this.orderRef = collection(this.firestore, 'order');
    this.postRef = collection(this.firestore, 'post');
    this.revewRef = collection(this.firestore, 'revew');
    this.userRef = collection(this.firestore, 'user');
    this.categoryRef = collection(this.firestore, 'category');
    this.platformRef = collection(this.firestore, 'platform');
    this.pegiRef = collection(this.firestore, 'pegi');
    this.genreRef = collection(this.firestore, 'genre');
  }

  /* Add Comments */
  addComment(comment: Comment): Promise<any> {
    let randomID = crypto.randomUUID()

    comment.idComment = randomID;

    const docRef = doc(this.firestore, "/comment/", randomID);

    this.addCommentUser(comment.userName);

    return setDoc(docRef, comment);
  }

  addCommentUser(name: string) {
    this.getUsersByName(name)
      .then(array => {
        array.forEach((element: any) => {
          let docRef = doc(this.firestore, "/user/", element.id);
    
          const USER = {
            totalComments: element.data().totalComments + 1
          }
    
          updateDoc(docRef, USER)
            .catch(error => {
              this._toastrService.error('There was an error updating the number of revews of a user:\n' + error.message, 'Update error: ' + error.code);
            });
        });
      });
  }

  /* Delete comment */
  delComment(id: string): Promise<any> {
    let commentRef = doc(this.firestore, "/comment/", id);

    getDoc(commentRef)
      .then((document: any) => {

        const COMMENT: Comment = {
          idComment: document.idComment,
          idPost: document.idPost,
          content: document.content,
          likes: document.likes,
          dislikes: document.dislikes,
          userName: document.userName
        };

        this.restUserInfo(COMMENT);
      })
      .catch(error => {
        this._toastrService.error('There was an error getting the comment:\n' + error.message, 'Get comment error: ' + error.code);
      })

    return deleteDoc(commentRef);
  }
  
  /* Get Coments */
  getComments(): Promise<any> {
    return getDocs(this.commentRef);
  }

  /* By Post id */
  getCommentsPost(id: string): Promise<any> {
    return getDocs(query(this.commentRef, where('idPost', '==', id)));
  }

  /* By Likes */
  getCommentsLikes(likes: number): Promise<any> {
    return getDocs(query(this.commentRef, where('likes', '==', likes)));
  }
  
  getCommentsMoreThanLikes(likes: number): Promise<any> {
    return getDocs(query(this.commentRef, where('likes', '>=', likes)));
  }

  getCommentsLessThanLikes(likes: number): Promise<any> {
    return getDocs(query(this.commentRef, where('likes', '<=', likes)));
  }

  /* By dislikes */
  getCommentsDislikes(dislikes: number): Promise<any> {
    return getDocs(query(this.commentRef, where('dislikes', '==', dislikes)));
  }
  
  getCommentsMoreThanDislikes(dislikes: number): Promise<any> {
    return getDocs(query(this.commentRef, where('dislikes', '>=', dislikes)));
  }
  
  getCommentsLessThanDislikes(dislikes: number): Promise<any> {
    return getDocs(query(this.commentRef, where('dislikes', '<=', dislikes)));
  }
  
  /* By User Name */
  getCommentsUserName(userName: string[] | string): Promise<any> {
    return getDocs(query(this.commentRef, where('userName', 'array-contains-any', userName)));
  }

  /* Add Games */
  addGame(game: Game): Promise<any> {

    const docRef = doc(this.firestore, "/game/", game.barCode);

    return setDoc(docRef, game);
  }

  /* Delete game */
  delGame(id: string): Promise<any> {
    let gameRef = doc(this.firestore, "/game/", id);

    getDoc(gameRef)
      .then((document: any) => {

        const GAME: Game = {
          barCode: document.barCode,
          title: document.title,
          description: document.description,
          multiplayer: document.multiplayer,
          price: document.price,
          stock: document.stock,
          pegi: document.pegi,
          platform: document.platform,
          genre: document.genre,
          releasingDate: document.releasingDate,
          cover: document.cover,
          totalRevews: document.totalRevews,
          averageRevews: document.averageRevews
        };

        this.restUserInfo(GAME);
      })
      .catch(error => {
        this._toastrService.error('There was an error getting the game:\n' + error.message, 'Get game error: ' + error.code);
      })

    return deleteDoc(gameRef);
  }

  /* Get Games */
  getGames(): Promise<any> {
    return getDocs(this.gameRef);
  }
  
  /* By barCode */
  getGamesBarCode(barCode: string): Promise<any> {
    return getDocs(query(this.gameRef, where('barCode', '==', barCode)));
  }

  /* By title */
  getGamesTitle(title: string[] | string): Promise<any> {
    return getDocs(query(this.gameRef, where('title', 'array-contains-any', title)));
  }
  
  /* By multiplayer */
  getGamesMultiplayer(multiplayer: boolean): Promise<any> {
    return getDocs(query(this.gameRef, where('multiplayer', '==', multiplayer)));
  }
  
  /* By price */
  getGamesPrice(price: number): Promise<any> {
    return getDocs(query(this.gameRef, where('price', '==', price)));
  }
  
  getGamesMoreThanPrice(price: number): Promise<any> {
    return getDocs(query(this.gameRef, where('price', '>=', price)));
  }

  getGamesLessThanPrice(price: number): Promise<any> {
    return getDocs(query(this.gameRef, where('price', '<=', price)));
  }
  
  /* By stock */
  getGamesStock(stock: number): Promise<any> {
    return getDocs(query(this.gameRef, where('stock', '==', stock)));
  }
  
  getGamesMoreThanStock(stock: number): Promise<any> {
    return getDocs(query(this.gameRef, where('stock', '>=', stock)));
  }

  getGamesLessThanStock(stock: number): Promise<any> {
    return getDocs(query(this.gameRef, where('stock', '<=', stock)));
  }
  
  /* By pegi */
  getGamesPegi(pegi: number[] | number): Promise<any> {
    return getDocs(query(this.gameRef, where('pegi', 'in', pegi)));
  }
  
  /* By platform */
  getGamesPlatform(platform: string[] | string): Promise<any> {
    return getDocs(query(this.gameRef, where('platform', 'in', platform)));
  }
  
  /* By genre */
  getGamesGenre(genre: string[] | string): Promise<any> {
    return getDocs(query(this.gameRef, where('genre', 'in', genre)));
  }
  
  /* By date */
  getGamesDate(releasingDate: string): Promise<any> {
    return getDocs(query(this.gameRef, where('releasingDate', '==', releasingDate)));
  }

  getGamesAfterDate(releasingDate: string): Promise<any> {
    return getDocs(query(this.gameRef, where('releasingDate', '>=', releasingDate)));
  }

  getGamesBeforeDate(releasingDate: string): Promise<any> {
    return getDocs(query(this.gameRef, where('releasingDate', '<=', releasingDate)));
  }

  /* Add Orders */
  addOrder(order: Order): Promise<any> {
    return addDoc(this.orderRef, order);
  }

  /* Get Orders */
  getOrders(): Promise<any> {
    return getDocs(this.orderRef);
  }
  
  /* By code */
  getOrdersCode(code: string): Promise<any> {
    return getDocs(query(this.orderRef, where('code', '==', code)));
  }
  
  /* By date */
  getOrdersDate(date: string): Promise<any> {
    return getDocs(query(this.orderRef, where('date', '==', date)));
  }

  getOrdersAfterDate(date: string): Promise<any> {
    return getDocs(query(this.orderRef, where('date', '>=', date)));
  }

  getOrdersBeforeDate(date: string): Promise<any> {
    return getDocs(query(this.orderRef, where('date', '<=', date)));
  }

  /* By User Name */
  getOrdersUserName(userName: string[] | string): Promise<any> {
    return getDocs(query(this.orderRef, where('userName', 'array-contains-any', userName)));
  }
  
  /* By destination */
  getOrdersDestination(destination: string): Promise<any> {
    return getDocs(query(this.orderRef, where('destination', '==', destination)));
  }
  
  /* By game code */
  getOrdersGameCode(gameCode: string): Promise<any> {
    return getDocs(query(this.orderRef, where('gameCode', '==', gameCode)));
  }

  /* By game title */
  getOrdersGameTitle(gameTitle: string[] | string): Promise<any> {
    return getDocs(query(this.orderRef, where('gameTitle', 'array-contains-any', gameTitle)));
  }
  
  /* By amount in order */
  getOrdersAmount(amount: number): Promise<any> {
    return getDocs(query(this.orderRef, where('amount', '==', amount)));
  }

  getOrdersMoreThanAmount(amount: number): Promise<any> {
    return getDocs(query(this.orderRef, where('amount', '>=', amount)));
  }

  getOrdersLessThanAmount(amount: number): Promise<any> {
    return getDocs(query(this.orderRef, where('amount', '<=', amount)));
  }
  
  /* By descount */
  getOrdersDescount(descount: number): Promise<any> {
    return getDocs(query(this.orderRef, where('descount', '==', descount)));
  }

  getOrdersMoreThanDescount(descount: number): Promise<any> {
    return getDocs(query(this.orderRef, where('descount', '>=', descount)));
  }

  getOrdersLessThanDescount(descount: number): Promise<any> {
    return getDocs(query(this.orderRef, where('descount', '<=', descount)));
  }

  /* Add Posts */
  addPost(post: Post): Promise<any> {
    let randomID = crypto.randomUUID()

    post.idPost = randomID;

    const docRef = doc(this.firestore, "/post/", randomID);

    this.addPostsUser(post.userName);

    return setDoc(docRef, post);
  }

  addPostsUser(name: string) {
    this.getUsersByName(name)
      .then(array => {
        array.forEach((element: any) => {
          let docRef = doc(this.firestore, "/user/", element.id);
    
          const USER = {
            totalPosts: element.data().totalPosts + 1
          }
    
          updateDoc(docRef, USER)
            .catch(error => {
              this._toastrService.error('There was an error updating the number of post of a user:\n' + error.message, 'Update posts error: ' + error.code);
            });
        });
      });
  }

  /* Delete Post */
  delPost(docId: string): Promise<any> {
    let docRef = doc(this.firestore, "/post/", docId);

    getDoc(docRef)
    .then((document: any) => {

      const POST: Post = {
        idPost: document.idPost,
        title: document.title,
        content: document.content,
        likes: document.likes,
        dislikes: document.dislikes,
        amountComments: document.amountComments,
        userName: document.userName,
        category: document.category
      };

      this.restUserInfo(POST);
    })
    .catch(error => {
      this._toastrService.error('There was an error getting the post:\n' + error.message, 'Get post error: ' + error.code);
    })

    getDocs(query(this.commentRef, where('idPost', '==', docId)))
      .then(array => {
        array.forEach((element: any) => {
          let commentRef = doc(this.firestore, "/comment/", element.id);

          deleteDoc(commentRef);
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error deleting the comments of the post:\n' + error.message, 'Delete comments error: ' + error.code)
      });

    return deleteDoc(docRef);
  }

  /* Get posts */
  getPosts(): Promise<any> {
    return getDocs(this.postRef);
  }

  /* By id */
  getPostsId(id: string): Promise<any> {
    return getDocs(query(this.postRef, where('idPost', '==', id)));
  }
  
  /* By title */
  getPostsTitle(title: string[] | string): Promise<any> {
    return getDocs(query(this.postRef, where('title', 'array-contains-any', title)));
  }
  
  /* By likes */
  getPostsLikes(likes: number): Promise<any> {
    return getDocs(query(this.postRef, where('likes', '==', likes)));
  }

  getPostsMoreThanLikes(likes: number): Promise<any> {
    return getDocs(query(this.postRef, where('likes', '>=', likes)));
  }

  getPostsLessThanLikes(likes: number): Promise<any> {
    return getDocs(query(this.postRef, where('likes', '<=', likes)));
  }
  
  /* By dislikes */
  getPostsDislikes(dislikes: number): Promise<any> {
    return getDocs(query(this.postRef, where('dislikes', '==', dislikes)));
  }

  getPostsMoreThanDislikes(dislikes: number): Promise<any> {
    return getDocs(query(this.postRef, where('dislikes', '>=', dislikes)));
  }

  getPostsLessThanDislikes(dislikes: number): Promise<any> {
    return getDocs(query(this.postRef, where('dislikes', '<=', dislikes)));
  }
  
  /* By amount of comments */
  getPostsAmountComments(amountComments: number): Promise<any> {
    return getDocs(query(this.postRef, where('amountComments', '==', amountComments)));
  }

  getPostsMoreThanAmountComments(amountComments: number): Promise<any> {
    return getDocs(query(this.postRef, where('amountComments', '>=', amountComments)));
  }

  getPostsLessThanAmountComments(amountComments: number): Promise<any> {
    return getDocs(query(this.postRef, where('amountComments', '<=', amountComments)));
  }

  /* By User Name */
  getPostsUserName(userName: string[] | string): Promise<any> {
    return getDocs(query(this.postRef, where('userName', 'array-contains-any', userName)));
  }
  
  /* By category */
  getPostsCategory(category: string[] | string): Promise<any> {
    return getDocs(query(this.postRef, where('category', 'in', category)));
  }

  /* Add revew */
  addRevew(revew: Revew): Promise<any> {
    let randomID = crypto.randomUUID()

    revew.id = randomID;

    const docRef = doc(this.firestore, "/revew/", randomID);

    /* Gets the game and updates it's information */
    let elementRef = doc(this.firestore, "/game/", revew.gameCode);

    getDoc(elementRef)
      .then((document: any) => {
        let total: number = 0;
        let counter: number = 0;
        let average: number = 0;

        this.getAverage(document.id)
          .then(arrayDocs => {
            arrayDocs.forEach((revewDoc: any) => {
              total += revewDoc.data().stars;
              counter += 1;
            });
          })
          .finally(() => {
            average = total / counter;

            const GAME = {
              totalRevews: (document.totalRevews + 1),
              averageRevews: average
            }

            updateDoc(elementRef, GAME)
              .catch(error => {
                this._toastrService.error('There was an error updating the average of a game:\n' + error.message, 'Average error: ' + error.code);
              });
          });
      });

    this.addRevewsUser(revew.userName);

    return setDoc(docRef, revew);
  }

  addRevewsUser(name: string) {
    this.getUsersByName(name)
      .then(array => {
        array.forEach((user: any) => {

          let refUser = doc(this.firestore, "/user/", user.data().userId);

          const USER = {
            totalRevews: user.data().totalRevews + 1
          }

          updateDoc(refUser, USER)
            .catch(error => {
              this._toastrService.error('There was an error updating the amount of revews of the user:\n' + error.message, 'Update revews error: ' + error.code);
            })
        });
      });
  }

  /* Delete revew */
  delRevew(document: any): Promise<any> {
    let revewRef = doc(this.firestore, "/revew/", document.id);

    const REVEW: Revew = {
      id: document.id,
      userName: document.userName,
      gameCode: document.gameCode,
      gameTitle: document.gameTitle,
      stars: document.stars,
      content: document.content,
    }

    let reference = doc(this.firestore, "/game/", document.gameCode)
    let total: number = 0;
    let counter: number = 0;
    let average: number = 0;

    this.getAverage(document.id)
      .then(arrayDocs => {
        arrayDocs.forEach((revewDoc: any) => {
          total += revewDoc.data().stars;
          counter += 1;
        });
      })
      .finally(() => {
        average = total / counter;

        const GAME = {
          totalRevews: (document.totalRevews - 1),
          averageRevews: average
        }

        updateDoc(reference, GAME)
          .catch(error => {
            this._toastrService.error('There was an error updating the average of a game:\n' + error.message, 'Average error: ' + error.code);
          });
      });

    return deleteDoc(revewRef);
  }

  /* Get revews */
  getRevews(): Promise<any> {
    return getDocs(this.revewRef);
  }
  
  /* By userName */
  getRevewsUserName(userName: string[] | string): Promise<any> {
    return getDocs(query(this.revewRef, where('userName', 'array-contains', userName)));
  }
  
  /* By gameCode */
  getRevewsGameCode(gameCode: string): Promise<any> {
    return getDocs(query(this.revewRef, where('gameCode', '==', gameCode)));
  }
  
  /* By stars */
  getRevewsStars(stars: number): Promise<any> {
    return getDocs(query(this.revewRef, where('stars', '==', stars)));
  }
  
  getRevewsMoreThanStars(stars: number): Promise<any> {
    return getDocs(query(this.revewRef, where('stars', '>=', stars)));
  }
  
  getRevewsLessThanStars(stars: number): Promise<any> {
    return getDocs(query(this.revewRef, where('stars', '<=', stars)));
  }

  /* Get users */
  getUsers(): Promise<any> {
    return getDocs(this.userRef);
  }

  /* By id */
  getUserId(id: string): Promise<any> {
    return getDocs(query(this.userRef, where('userId', '==', id)));
  }

  /* By user name */
  getUsersByName(name: any): Promise<any> {
    return getDocs(query(this.userRef, where('userName', '==', name)))
  }

  /* Add user */
  addUser(user: User) {
    let randomID = crypto.randomUUID()

    user.userId = randomID;

    const docRef = doc(this.firestore, "/user/", randomID);

    return setDoc(docRef, user);
  }

  /* Get categories */
  getCategories(): Promise<any> {
    return getDocs(this.categoryRef);
  }

  /* Get platforms */
  getPlatforms(): Promise<any> {
    return getDocs(this.platformRef);
  }

  /* Get pegis */
  getPegis(): Promise<any> {
    return getDocs(this.pegiRef);
  }

  /* Get genres */
  getGenres(): Promise<any> {
    return getDocs(this.genreRef);
  }

  /* Update user information before delete a comment, post, revew or game */
  restUserInfo(document: any) {
    if (document.idComment) {
      this.delCommentInfo(document);
    }
    else if (document.idPost) {
      this.delPostInfo(document);
    }
    else if (document.gameCode) {
      this.delRevewInfo(document);
    }
    else if (document.barCode) {
      this.delGameInfo(document);
    }
  }

  /* Update user information before delete a comment */
  delCommentInfo(document: any) {    
    this.getUsersByName(document.userName)
      .then(array => {
        array.forEach((element: any) => {
          let docRef = doc(this.firestore, "/user/", element.id);

          const USER = {
            totalComments: element.data().totalComments - 1,
          }
    
          this.updateLikesDislikes(USER, element, document);
    
          updateDoc(docRef, USER)
            .catch(error => {
              this._toastrService.error('There was an error updating the likes and dislikes of a user:\n' + error.message, 'Update error: ' + error.code);
            });
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error getting the user:\n' + error.message, 'Get user by name: ' + error.code);
      });
  }

  /* Update user information before delete a post */
  delPostInfo(document: any) {
    let comments: number = 0;
    let likes: number = 0;
    let dislikes: number = 0;

    this.getCommentsPost(document.idPost)
      .then(array => {
        array.forEach((element: any) => {
          comments++;
          likes += element.data().likes
          dislikes += element.data().dislikes
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error getting the comments from a post:\n' + error.message, 'Get comments error: ' + error.code);
      })

    this.getUsersByName(document.userName)
      .then(array => {
        array.forEach((element: any) => {
          let docRef = doc(this.firestore, "/user/", element.id);

          const USER = {
            totalPosts: element.data().totalPosts - 1,
            totalLikes: 0,
            totalDislikes: 0,
            totalComments: element.data().totalComments - comments
          }
    
          this.updateLikesDislikes(USER, element, document);

          USER.totalLikes -= likes;
          USER.totalDislikes -= dislikes;

          updateDoc(docRef, USER)
            .catch(error => {
              this._toastrService.error('There was an error updating the likes and dislikes of a user:\n' + error.message, 'Update error: ' + error.code);
            });
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error getting the user:\n' + error.message, 'Get user by name: ' + error.code);
      })
  }

  /* Update user information before delete a revew */
  delRevewInfo(document: any) {
    let total: number = 0;
    let counter: number = 0;
    let average: number = 0;
    let reference = doc(this.firestore, "/game/", document.gameCode)
    
    getDoc(reference)
      .then(async (document: any) => {
        this.getAverage(document.id)
          .then(arrayDocs => {
            arrayDocs.forEach((revewDoc: any) => {
              total += revewDoc.data().stars;
              counter += 1;
            });
          })
          .finally(() => {
            if (counter == 0) {
              average = -1;
            }
            else {
              average = total / counter;
            }

            const GAME = {
              totalRevews: counter,
              averageRevews: average
            }
    
            updateDoc(reference, GAME)
            .catch(error => {
              this._toastrService.error('There was an error updating the game average:\n' + error.message, 'Game error: ' + error.code);
            });
          });
      });  
    
    
    this.delRevewUser(document.userName)
  }

  delRevewUser(name: string) {
    this.getUsersByName(name)
      .then(array => {

        array.forEach((element: any) => {
          let docRef = doc(this.firestore, "/user/", element.id);
    
          const USER = {
            totalRevews: (element.data().totalRevews - 1)
          }
    
          updateDoc(docRef, USER)
            .catch(error => {
              this._toastrService.error('There was an error updating the number of revews of a user:\n' + error.message, 'Update error: ' + error.code);
            });
        });
      });
  }

  delGameInfo(document: any) {
    this.getRevewsGameCode(document.barCode)
      .then(array => {

        array.forEach((element: any) => {
          let docRef = doc(this.firestore, "/revew/", element.id);

          let revew: Revew = {
            id: element.data().id,
            userName: element.data().userName,
            gameCode: element.data().gameCode,
            gameTitle: element.data().gameTitle,
            stars: element.data().stars,
            content: element.data().content,
          }

          this.restUserInfo(revew);

          deleteDoc(docRef);
        });
      })
      .catch(error => {
        this._toastrService.error('There was an error deleting the revews of the game:\n' + error.message, 'Delete revews of game error: ' + error.code);
      });
  }

  updateLikesDislikes(object: any, user: any, document: any) {
    object.totalLikes = user.data().totalLikes - document.likes;
    object.totalDislikes = user.data().totalDislikes - document.dislikes;
  }

  getAverage(id: string): Promise<any> {
    return this.getRevewsGameCode(id);
  }

  addLikePost(id: string) {
    let refPost = doc(this.firestore, "/post/", id);
    let postDoc: Post;

    getDoc(refPost)
      .then((document: any) => {
        postDoc = {
          idPost: document.data().idPost,
          title: document.data().title,
          content: document.data().content,
          likes: document.data().likes,
          dislikes: document.data().dislikes,
          amountComments: document.data().amountComments,
          userName: document.data().userName,
          category: document.data().category
        }
      })
      .catch(error => {
        this._toastrService.error('There was an error getting a post:\n' + error.message, 'Get post error: ' + error.code);
      })
      .finally(() => {
        let update = {
          likes: (postDoc.likes + 1)
        }

        updateDoc(refPost, update)
          .catch(error => {
            this._toastrService.error('There was an error updating a post:\n' + error.message, 'Update post error: ' + error.code);
          });

        this.updateUserLikes(postDoc.userName);
      });
  }
  
  addDislikePost(id: string) {
    let refPost = doc(this.firestore, "/post/", id);
    let postDoc: Post;

    getDoc(refPost)
      .then((document: any) => {
        postDoc = {
          idPost: document.data().idPost,
          title: document.data().title,
          content: document.data().content,
          likes: document.data().likes,
          dislikes: document.data().dislikes,
          amountComments: document.data().amountComments,
          userName: document.data().userName,
          category: document.data().category
        }
      })
      .catch(error => {
        this._toastrService.error('There was an error getting a post:\n' + error.message, 'Get post error: ' + error.code);
      })
      .finally(() => {
        let update = {
          dislikes: (postDoc.dislikes + 1)
        }

        updateDoc(refPost, update)
          .catch(error => {
            this._toastrService.error('There was an error updating a post:\n' + error.message, 'Update post error: ' + error.code);
          });

        this.updateUserDislikes(postDoc.userName);
      });
  }
  
  addLikeComment(id: string) {
    let refComment = doc(this.firestore, "/comment/", id);
    let commentDoc: Comment;

    getDoc(refComment)
      .then((document: any) => {
        commentDoc = {
          idComment: document.data().idComment,
          idPost: document.data().idPost,
          content: document.data().content,
          likes: document.data().likes,
          dislikes: document.data().dislikes,
          userName: document.data().userName
        }
      })
      .catch(error => {
        this._toastrService.error('There was an error getting a comment:\n' + error.message, 'Get comment error: ' + error.code);
      })
      .finally(() => {
        let update = {
          likes: (commentDoc.likes + 1)
        }

        updateDoc(refComment, update)
          .catch(error => {
            this._toastrService.error('There was an error updating a comment:\n' + error.message, 'Update comment error: ' + error.code);
          });

        this.updateUserLikes(commentDoc.userName);
      });
  }
  
  addDislikeComment(id: string) {
    let refComment = doc(this.firestore, "/comment/", id);
    let commentDoc: Comment;

    getDoc(refComment)
      .then((document: any) => {
        commentDoc = {
          idComment: document.data().idComment,
          idPost: document.data().idPost,
          content: document.data().content,
          likes: document.data().likes,
          dislikes: document.data().dislikes,
          userName: document.data().userName
        }
      })
      .catch(error => {
        this._toastrService.error('There was an error getting a comment:\n' + error.message, 'Get comment error: ' + error.code);
      })
      .finally(() => {
        let update = {
          dislikes: (commentDoc.dislikes + 1)
        }

        updateDoc(refComment, update)
          .catch(error => {
            this._toastrService.error('There was an error updating a comment:\n' + error.message, 'Update comment error: ' + error.code);
          });

        this.updateUserDislikes(commentDoc.userName);
      });
  }

  updateUserLikes(userName: string) {
    this.getUsersByName(userName)
      .then(array => {
        array.forEach((element: any) => {
          let refUser = doc(this.firestore, "/user/", element.id);

          let update = {
            totalLikes: (element.data().totalLikes + 1)
          }

          updateDoc(refUser, update);
        });
      })
  }

  updateUserDislikes(userName: string) {
    this.getUsersByName(userName)
      .then(array => {
        array.forEach((element: any) => {
          let refUser = doc(this.firestore, "/user/", element.id);

          let update = {
            totalDislikes: (element.data().totalDislikes + 1)
          }

          updateDoc(refUser, update);
        });
      })
  }

  updatePost(postId: string, object: any) {
    let refPost = doc(this.firestore, "/post/", postId);

    return updateDoc(refPost, object);
  }

  updateComment(commentId: string, object: any) {
    let refComment = doc(this.firestore, "/comment/", commentId);

    return updateDoc(refComment, object);
  }

  updateRevew(revewId: string, object: any) {
    let refRevew = doc(this.firestore, "/revew/", revewId);

    return updateDoc(refRevew, object);
  }

  updateGame(barCode: string, object: any) {
    let refGame = doc(this.firestore, "/game/", barCode);

    return updateDoc(refGame, object);
  }
}