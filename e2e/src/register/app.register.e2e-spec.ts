import { AppRegisterPage } from './app.register.po';

describe('tests in the registration form', () => {
  let page: AppRegisterPage;

  beforeEach(() => {
    page = new AppRegisterPage();
  });

  it('must navigate to register form', () => {
    page.startNavigation();
    page.getRegisterTitle().then(response => {
      expect(response).toEqual('Cadastro');
    });

  });

  it('must complete register form successfully', () => {

    page.fieldUser.sendKeys('Tes' + Math.random() + 'te@gmail.com' + Math.random());
    page.fieldPassword.sendKeys('Teste@123');
    page.fieldConfirmPassword.sendKeys('Teste@123');

    page.btnRegister.click();
    page.getRegisterResult().then(response => {

      expect(response).toBe(false);
    })
  });

  it('must validate different passwords', () => {
    page.startNavigation();
    page.fieldUser.sendKeys('testealeatorio@gmail.com');
    page.fieldPassword.sendKeys('Teste@123');
    page.fieldConfirmPassword.sendKeys('Teste@2123');

    page.fieldPassword.click();

    expect(page.getPasswordError()).toContain('As senhas não conferem');
  });


});
