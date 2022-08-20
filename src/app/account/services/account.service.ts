import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utilities/localstorage';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public LocalStorage = new LocalStorageUtils();
  constructor (private fireAuth: AngularFireAuth, private router: Router) {
}

  login(user: User) : Promise<unknown>{
  return this.fireAuth.signInWithEmailAndPassword(user.email, user.password).then((response) => {
    this.LocalStorage.saveTokenUser(response.user?.uid as string);
    });
  }

  logout() {
    this.fireAuth.signOut().then(() => {
      this.LocalStorage.clearUserLocalData();
      this.router.navigate(['/account/login']);
    });
  }

  register(user: User) : Promise<void> {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password).then((response) => {
      this.LocalStorage.saveTokenUser(response.user?.uid as string);
    });
  }

}

