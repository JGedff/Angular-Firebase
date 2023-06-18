import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

//Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//Toastr imports
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { enviroment } from 'src/enviroments/enviroment';

//Used components
import { PostComponent } from 'src/app/components/frontend/post/post.component';
import { CommentComponent } from 'src/app/components/frontend/comment/comment.component';
import { HeaderComponent } from 'src/app/components/frontend/header/header.component';
import { FooterComponent } from 'src/app/components/frontend/footer/footer.component';
import { HomeComponent } from 'src/app/components/frontend/home/home.component';
import { GamesComponent } from 'src/app/components/frontend/games/games.component';
import { RevewsComponent } from 'src/app/components/frontend/revews/revews.component';
import { ContactComponent } from 'src/app/components/frontend/contact/contact.component';
import { AddPostComponent } from 'src/app/components/add-edit/add-post/add-post.component';
import { AddCommentComponent } from 'src/app/components/add-edit/add-comment/add-comment.component';
import { AddRevewComponent } from 'src/app/components/add-edit/add-revew/add-revew.component';
import { LoginComponent } from './components/frontend/login/login.component';
import { UserInfoComponent } from './components/frontend/user-info/user-info.component';
import { AddGameComponent } from './components/add-edit/add-game/add-game.component';
import { DashboardComponent } from './components/administration/dashboard/dashboard.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { EditPostComponent } from './components/add-edit/edit-post/edit-post.component';
import { EditCommentComponent } from './components/add-edit/edit-comment/edit-comment.component';
import { EditRevewComponent } from './components/add-edit/edit-revew/edit-revew.component';
import { EditGameComponent } from './components/add-edit/edit-game/edit-game.component';

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
    AddRevewComponent,
    LoginComponent,
    UserInfoComponent,
    AddGameComponent,
    DashboardComponent,
    CalculatorComponent,
    EditPostComponent,
    EditCommentComponent,
    EditRevewComponent,
    EditGameComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(enviroment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
