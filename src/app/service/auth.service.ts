import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(data => {
        this.router.navigateByUrl('/');
        localStorage.setItem('currentUser', JSON.stringify(data.user));
      })
      .catch(err => {
        console.log('Something went wrong: ', err)

      });
  }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.router.navigateByUrl('/');
        console.log(data);
      })
      .catch(err => {
        console.log('Something went wrong: ', err)

      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
      localStorage.removeItem('currentUser');
    })
  }


}
