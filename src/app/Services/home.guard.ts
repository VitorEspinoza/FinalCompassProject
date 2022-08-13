import { LocalStorageUtils } from 'src/app/utilities/localstorage';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  LocalStorage = new LocalStorageUtils();
  constructor(private router: Router, private fireAuth: AngularFireAuth) { }

  canActivate() {
    this.fireAuth.authState.subscribe(response => {
      if(this.LocalStorage.getTokenUser() == response?.uid)
      {
        this.router.navigate(['/account/login'])
      }
    });
   return true;
  }

}
