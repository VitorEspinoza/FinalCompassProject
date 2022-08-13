import { browser, by, element } from 'protractor';
import { AppBasePage } from '../app.base.po';

export class AppRegisterPage extends AppBasePage {

  constructor() { super(); }

  navigateToRegister() {
    this.navigateByUrl('account/register');
  }

  navigateToRegisterByLink() {
    this.navigateByLink('Não possui uma conta? Cadastre-se');
  }

  startNavigation() {
    this.navigateToIndex();
    this.navigateToRegisterByLink();
  }

  getRegisterTitle(){
   return element(by.id('register-title')).getText();
  }

  fieldUser = element(by.id('email'));
  fieldPassword = element(by.id('password'));
  fieldConfirmPassword = element(by.id('confirmPassword'));

  btnRegister = element(by.id('btn-register'));

  getRegisterResult() {
    return element(by.id('register-fail')).isPresent();
  }

  getPasswordError() {
    return this.getElementXpath('/html/body/app-root/account-app-root/app-register/div/div[1]/div/div[1]/form/div[3]/span').getText();
  }
}
