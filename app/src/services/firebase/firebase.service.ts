import { Injectable } from '@angular/core';

import { Firestore, addDoc, collection, getDocs, query, where, setDoc, doc } from '@angular/fire/firestore';

import { Comment } from 'src/model/Comment';
import { Game } from 'src/model/Game';
import { Order } from 'src/model/Order';
import { Post } from 'src/model/Post';
import { Revew } from 'src/model/Revew';
import { User } from 'src/model/User';

import * as uuid from 'uuid';

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

  constructor(private firestore: Firestore) {

    this.commentRef = collection(this.firestore, 'comment');
    this.gameRef = collection(this.firestore, 'game');
    this.orderRef = collection(this.firestore, 'order');
    this.postRef = collection(this.firestore, 'post');
    this.revewRef = collection(this.firestore, 'revew');
    this.userRef = collection(this.firestore, 'user');
    this.categoryRef = collection(this.firestore, 'category');
  }

  /* Add Comments */
  addComment(comment: Comment): Promise<any> {
    let randomID = uuid.v4();

    comment.idComment = randomID;

    const docRef = doc(this.firestore, 'comment', randomID);

    return setDoc(docRef, comment);
  }
  
  /* Get Coments */
  getComments(): Promise<any> {
    return getDocs(this.commentRef);
  }

  /* By Post id */
  getCommentsPost(id: String): Promise<any> {
    return getDocs(query(this.commentRef, where('idPost', '==', id)));
  }

  /* By Likes */
  getCommentsLikes(likes: Number): Promise<any> {
    return getDocs(query(this.commentRef, where('likes', '==', likes)));
  }
  
  getCommentsMoreThanLikes(likes: Number): Promise<any> {
    return getDocs(query(this.commentRef, where('likes', '>=', likes)));
  }

  getCommentsLessThanLikes(likes: Number): Promise<any> {
    return getDocs(query(this.commentRef, where('likes', '<=', likes)));
  }

  /* By visits */
  getCommentsVisits(visits: Number): Promise<any> {
    return getDocs(query(this.commentRef, where('visits', '==', visits)));
  }
  
  getCommentsMoreThanVisits(visits: Number): Promise<any> {
    return getDocs(query(this.commentRef, where('visits', '>=', visits)));
  }
  
  getCommentsLessThanVisits(visits: Number): Promise<any> {
    return getDocs(query(this.commentRef, where('visits', '<=', visits)));
  }
  
  /* By User Name */
  getCommentsUserName(userName: String[] | String): Promise<any> {
    return getDocs(query(this.commentRef, where('userName', 'array-contains-any', userName)));
  }

  /* Add Games */
  addGame(game: Game): Promise<any> {
    let randomID = uuid.v4();

    game.barCode = randomID;

    const docRef = doc(this.firestore, 'game', randomID);

    return setDoc(docRef, game);
  }

  /* Get Games */
  getGames(): Promise<any> {
    return getDocs(this.gameRef);
  }
  
  /* By barCode */
  getGamesBarCode(barCode: String): Promise<any> {
    return getDocs(query(this.gameRef, where('barCode', '==', barCode)));
  }

  /* By title */
  getGamesTitle(title: String[] | String): Promise<any> {
    return getDocs(query(this.gameRef, where('title', 'array-contains-any', title)));
  }
  
  /* By multiplayer */
  getGamesMultiplayer(multiplayer: Boolean): Promise<any> {
    return getDocs(query(this.gameRef, where('multiplayer', '==', multiplayer)));
  }
  
  /* By price */
  getGamesPrice(price: Number): Promise<any> {
    return getDocs(query(this.gameRef, where('price', '==', price)));
  }
  
  getGamesMoreThanPrice(price: Number): Promise<any> {
    return getDocs(query(this.gameRef, where('price', '>=', price)));
  }

  getGamesLessThanPrice(price: Number): Promise<any> {
    return getDocs(query(this.gameRef, where('price', '<=', price)));
  }
  
  /* By stock */
  getGamesStock(stock: Number): Promise<any> {
    return getDocs(query(this.gameRef, where('stock', '==', stock)));
  }
  
  getGamesMoreThanStock(stock: Number): Promise<any> {
    return getDocs(query(this.gameRef, where('stock', '>=', stock)));
  }

  getGamesLessThanStock(stock: Number): Promise<any> {
    return getDocs(query(this.gameRef, where('stock', '<=', stock)));
  }
  
  /* By pegi */
  getGamesPegi(pegi: Number[] | Number): Promise<any> {
    return getDocs(query(this.gameRef, where('pegi', 'in', pegi)));
  }
  
  /* By platform */
  getGamesPlatform(platform: String[] | String): Promise<any> {
    return getDocs(query(this.gameRef, where('platform', 'in', platform)));
  }
  
  /* By genre */
  getGamesGenre(genre: String[] | String): Promise<any> {
    return getDocs(query(this.gameRef, where('genre', 'in', genre)));
  }
  
  /* By date */
  getGamesDate(releasingDate: String): Promise<any> {
    return getDocs(query(this.gameRef, where('releasingDate', '==', releasingDate)));
  }

  getGamesAfterDate(releasingDate: String): Promise<any> {
    return getDocs(query(this.gameRef, where('releasingDate', '>=', releasingDate)));
  }

  getGamesBeforeDate(releasingDate: String): Promise<any> {
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
  getOrdersCode(code: String): Promise<any> {
    return getDocs(query(this.orderRef, where('code', '==', code)));
  }
  
  /* By date */
  getOrdersDate(date: String): Promise<any> {
    return getDocs(query(this.orderRef, where('date', '==', date)));
  }

  getOrdersAfterDate(date: String): Promise<any> {
    return getDocs(query(this.orderRef, where('date', '>=', date)));
  }

  getOrdersBeforeDate(date: String): Promise<any> {
    return getDocs(query(this.orderRef, where('date', '<=', date)));
  }

  /* By User Name */
  getOrdersUserName(userName: String[] | String): Promise<any> {
    return getDocs(query(this.orderRef, where('userName', 'array-contains-any', userName)));
  }
  
  /* By destination */
  getOrdersDestination(destination: String): Promise<any> {
    return getDocs(query(this.orderRef, where('destination', '==', destination)));
  }
  
  /* By game code */
  getOrdersGameCode(gameCode: String): Promise<any> {
    return getDocs(query(this.orderRef, where('gameCode', '==', gameCode)));
  }

  /* By game title */
  getOrdersGameTitle(gameTitle: String[] | String): Promise<any> {
    return getDocs(query(this.orderRef, where('gameTitle', 'array-contains-any', gameTitle)));
  }
  
  /* By amount in order */
  getOrdersAmount(amount: Number): Promise<any> {
    return getDocs(query(this.orderRef, where('amount', '==', amount)));
  }

  getOrdersMoreThanAmount(amount: Number): Promise<any> {
    return getDocs(query(this.orderRef, where('amount', '>=', amount)));
  }

  getOrdersLessThanAmount(amount: Number): Promise<any> {
    return getDocs(query(this.orderRef, where('amount', '<=', amount)));
  }
  
  /* By descount */
  getOrdersDescount(descount: Number): Promise<any> {
    return getDocs(query(this.orderRef, where('descount', '==', descount)));
  }

  getOrdersMoreThanDescount(descount: Number): Promise<any> {
    return getDocs(query(this.orderRef, where('descount', '>=', descount)));
  }

  getOrdersLessThanDescount(descount: Number): Promise<any> {
    return getDocs(query(this.orderRef, where('descount', '<=', descount)));
  }

  /* Add Posts */
  addPost(post: Post): Promise<any> {
    let randomID = uuid.v4();

    post.idPost = randomID;

    const docRef = doc(this.firestore, 'post', randomID);

    return setDoc(docRef, post);
  }

  /* Get posts */
  getPosts(): Promise<any> {
    return getDocs(this.postRef);
  }

  /* By id */
  getPostsId(id: String): Promise<any> {
    return getDocs(query(this.postRef, where('idPost', '==', id)));
  }
  
  /* By title */
  getPostsTitle(title: String[] | String): Promise<any> {
    return getDocs(query(this.postRef, where('title', 'array-contains-any', title)));
  }
  
  /* By likes */
  getPostsLikes(likes: Number): Promise<any> {
    return getDocs(query(this.postRef, where('likes', '==', likes)));
  }

  getPostsMoreThanLikes(likes: Number): Promise<any> {
    return getDocs(query(this.postRef, where('likes', '>=', likes)));
  }

  getPostsLessThanLikes(likes: Number): Promise<any> {
    return getDocs(query(this.postRef, where('likes', '<=', likes)));
  }
  
  /* By visits */
  getPostsVisits(visits: Number): Promise<any> {
    return getDocs(query(this.postRef, where('visits', '==', visits)));
  }

  getPostsMoreThanVisits(visits: Number): Promise<any> {
    return getDocs(query(this.postRef, where('visits', '>=', visits)));
  }

  getPostsLessThanVisits(visits: Number): Promise<any> {
    return getDocs(query(this.postRef, where('visits', '<=', visits)));
  }
  
  /* By amount of comments */
  getPostsAmountComments(amountComments: Number): Promise<any> {
    return getDocs(query(this.postRef, where('amountComments', '==', amountComments)));
  }

  getPostsMoreThanAmountComments(amountComments: Number): Promise<any> {
    return getDocs(query(this.postRef, where('amountComments', '>=', amountComments)));
  }

  getPostsLessThanAmountComments(amountComments: Number): Promise<any> {
    return getDocs(query(this.postRef, where('amountComments', '<=', amountComments)));
  }

  /* By User Name */
  getPostsUserName(userName: String[] | String): Promise<any> {
    return getDocs(query(this.postRef, where('userName', 'array-contains-any', userName)));
  }
  
  /* By category */
  getPostsCategory(category: String[] | String): Promise<any> {
    return getDocs(query(this.postRef, where('category', 'in', category)));
  }

  /* Add revew */
  addRevew(revew: Revew): Promise<any> {
    return addDoc(this.revewRef, revew);
  }

  /* Get revews */
  getRevews(): Promise<any> {
    return getDocs(this.revewRef);
  }
  
  /* By userName */
  getRevewsUserName(userName: String[] | String): Promise<any> {
    return getDocs(query(this.revewRef, where('userName', 'array-contains', userName)));
  }
  
  /* By gameCode */
  getRevewsGameCode(gameCode: String): Promise<any> {
    return getDocs(query(this.revewRef, where('gameCode', '==', gameCode)));
  }
  
  /* By stars */
  getRevewsStars(stars: Number): Promise<any> {
    return getDocs(query(this.revewRef, where('stars', '==', stars)));
  }
  
  getRevewsMoreThanStars(stars: Number): Promise<any> {
    return getDocs(query(this.revewRef, where('stars', '>=', stars)));
  }
  
  getRevewsLessThanStars(stars: Number): Promise<any> {
    return getDocs(query(this.revewRef, where('stars', '<=', stars)));
  }

  /* Add User */
  addUser(user: User): Promise<any> {
    return addDoc(this.userRef, user);
  }

  /* Get users */
  getUsers(): Promise<any> {
    return getDocs(this.userRef);
  }

  /* By code */
  getUsersCode(code: String): Promise<any> {
    return getDocs(query(this.userRef, where('code', '==', code)));
  }

  /* By userName */
  getUsersName(userName: String[] | String): Promise<any> {
    return getDocs(query(this.userRef, where('userName', 'array-contains-any', userName)));
  }

  /* By amount of Posts */
  getUsersAmountPosts(amountPosts: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountPosts', '==', amountPosts)));
  }

  getUsersMoreThanAmountPosts(amountPosts: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountPosts', '>=', amountPosts)));
  }

  getUsersLessThanAmountPosts(amountPosts: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountPosts', '<=', amountPosts)));
  }

  /* By amount of Comments */
  getUsersAmountComments(amountComments: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountComments', '==', amountComments)));
  }

  getUsersMoreThanAmountComments(amountComments: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountComments', '>=', amountComments)));
  }

  getUsersLessThanAmountComments(amountComments: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountComments', '<=', amountComments)));
  }

  /* By amount of Revews */
  getUsersAmountRevews(amountRevews: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountRevews', '==', amountRevews)));
  }

  getUsersMoreThanAmountRevews(amountRevews: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountRevews', '>=', amountRevews)));
  }

  getUsersLessThanAmountRevews(amountRevews: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountRevews', '<=', amountRevews)));
  }

  /* By amount of Likes */
  getUsersAmountLikes(amountLikes: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountLikes', '==', amountLikes)));
  }

  getUsersMoreThanAmountLikes(amountLikes: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountLikes', '>=', amountLikes)));
  }

  getUsersLessThanAmountLikes(amountLikes: Number): Promise<any> {
    return getDocs(query(this.userRef, where('amountLikes', '<=', amountLikes)));
  }

  /* By userVip */
  getUsersVip(userVip: Boolean): Promise<any> {
    return getDocs(query(this.userRef, where('userVip', '==', userVip)));
  }

  /* Get categories */
  getCategories(): Promise<any> {
    return getDocs(this.categoryRef);
  }
}