import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageUtils } from '../../utilities/localstorage';
import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanDeactivate<RegisterComponent>, CanActivate{

  constructor(private router: Router) { }

  localStorageUtils = new LocalStorageUtils();
  canDeactivate(component: RegisterComponent) {
    if(component.mudancasNaoSalvas) {
      return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
    }
    return true;
  }

  canActivate() {

    if(this.localStorageUtils.getTokenUser()){
        this.router.navigate(['/home']);
    }

    return true;
  }


}
