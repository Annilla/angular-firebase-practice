import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  userInfo: any;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private dataService: DataService) {
    // 當登入狀態改變的時候執行
    this.afAuth.authState.subscribe(data => {
      // 登入成功有資料的時候執行
      if (data) {
        // 從 users 資料庫找對應 email 的 userInfo
        this.userInfo = afs.collection('users',
        ref => ref.where('email', '==', data.email))
        .snapshotChanges();
        // 將 userId 儲存在 global 變數
        this.userInfo.subscribe(info => {
          this.dataService.changeUserId(info[0].payload.doc.id);
        });
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
