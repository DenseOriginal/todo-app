import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MaterialModule } from './material-module';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { TodoBoardComponent } from './todo-board/todo-board.component';
import { NewTaskModalComponent } from './todo-board/new-task-modal.component';
import { AppRoutingModule } from './app-routing.module';
import { NewBoardModalComponent } from './main-nav/new-board.component';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WelcomeComponent } from './welcome/welcome.component';

const firebaseConfig = {
  apiKey: "AIzaSyB3S_4jYpsp4AbRx2RG-fhv0sOl3IBPGZc",
  authDomain: "sandbox-f5953.firebaseapp.com",
  databaseURL: "https://sandbox-f5953.firebaseio.com",
  projectId: "sandbox-f5953",
  storageBucket: "sandbox-f5953.appspot.com",
  messagingSenderId: "331893658824",
  appId: "1:331893658824:web:081b6dcb89a533d2b7c1fd",
  measurementId: "G-7Q3CM15BJZ"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    MainNavComponent,
    TodoBoardComponent,
    NewTaskModalComponent,
    NewBoardModalComponent,
    WelcomeComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent, NewTaskModalComponent, NewBoardModalComponent]
})
export class AppModule { }
