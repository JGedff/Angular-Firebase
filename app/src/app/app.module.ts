import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

//Used components
import { PostComponent } from 'src/app/components/frontend/post/post.component';
import { CommentComponent } from 'src/app/components/frontend/comment/comment.component';
import { HeaderComponent } from 'src/app/components/frontend/header/header.component';
import { FooterComponent } from 'src/app/components/frontend/footer/footer.component';
import { HomeComponent } from 'src/app/components/frontend/home/home.component';
import { GamesComponent } from 'src/app/components/frontend/games/games.component';
import { RevewsComponent } from 'src/app/components/frontend/revews/revews.component';
import { ContactComponent } from 'src/app/components/frontend/contact/contact.component';
import { AddPostComponent } from 'src/app/components/add/add-post/add-post.component';
import { AddCommentComponent } from 'src/app/components/add/add-comment/add-comment.component';
import { AddRevewComponent } from 'src/app/components/add/add-revew/add-revew.component';

//Firebase imports
import { provideFirebaseApp,  initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { enviroment } from 'src/enviroments/enviroment';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GamesComponent,
    RevewsComponent,
    ContactComponent,
    AddPostComponent,
    AddCommentComponent,
    AddRevewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(enviroment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
