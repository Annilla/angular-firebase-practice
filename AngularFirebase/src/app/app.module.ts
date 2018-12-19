import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { UsersComponent } from './users.component';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDX6d3yr7y6LFRHW4MXL0KsidIwYLnv_v0",
  authDomain: "angulartest-550ea.firebaseapp.com",
  databaseURL: "https://angulartest-550ea.firebaseio.com",
  projectId: "angulartest-550ea",
  storageBucket: "angulartest-550ea.appspot.com",
  messagingSenderId: "28147067722"
};

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }