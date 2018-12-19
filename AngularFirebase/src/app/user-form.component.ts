import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from './user';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})

export class UserFormComponent {
  form: FormGroup;
  user = new User();

  constructor(fb: FormBuilder, private _router: Router, private afs: AngularFirestore) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  submit() {
    this.afs.collection('users').add({
      name: this.user.name,
      email: this.user.email
    })
    this._router.navigate(['']);
  }
}