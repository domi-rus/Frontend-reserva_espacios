import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authFire: AngularFireAuth, private router: Router) { }

  async loginGoogle() {
    try {
      this.authFire.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['/workspace'])
    }
    catch (err) {
      console.log(err)
    }
  }

  async logout() {
    try {
      await this.authFire.signOut();
      this.router.navigate(['/home'])
    }
    catch (err) {
      console.log(err)
    }
  }
}
