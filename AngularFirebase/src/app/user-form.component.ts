import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from './user';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html'
})

export class UserFormComponent {
  form: FormGroup;
  user = new User();
  title: string;
  id;

  userDoc: AngularFirestoreDocument<User>;
  singleUser: Observable<User>;

  constructor(fb: FormBuilder, private _router: Router, private afs: AngularFirestore, private _route: ActivatedRoute) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  ngOnInit(){
    this._route.params.subscribe(params =>{
      this.id = params["id"];
    });

    if(!this.id) {
      this.title = "New User";
    } else {
      this.title = "Edit User";
      this.userDoc = this.afs.doc(`users/${this.id}`);
      this.singleUser = this.userDoc.valueChanges();
      this.singleUser.subscribe(user => {
        this.form.get('name').setValue(user.name);
        this.form.get('email').setValue(user.email);
      });
    }
  }

  submit() {

    if(this.id) {
      this.afs.doc(`users/${this.id}`).update({
        name: this.form.get('name').value,
        email: this.form.get('email').value
      });
    } else {
      this.afs.collection('users').add({
        name: this.form.get('name').value,
        email: this.form.get('email').value
      })
    }

    this._router.navigate(['']);
  }
}