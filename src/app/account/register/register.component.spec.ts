import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountService } from './../services/account.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { CustomValidators } from '@narik/custom-validators';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    const accountServiceStub = () => ({
      register: (user: any) => ({ then: () => ({ catch: () => ({}) }) })
    });
    const formBuilderStub = () => ({ group: (object: FormGroup) => ({}) });
    const activatedRouteStub = () => ({ snapshot: { queryParams: {} } });
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    const toastrServiceStub = () => ({
      success: (string: string, string1: string) => ({ onHidden: { subscribe: (f: (arg0: {}) => any) => f({}) } }),
      error: (error: any, string: any) => ({})
    });
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegisterComponent],
      providers: [
        { provide: AccountService, useFactory: accountServiceStub },
        { FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: ToastrService, useFactory: toastrServiceStub },
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub }
      ]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('Should check for a number on the string', () => {
      var stringTeste: string = 'A3@Eeet';

      expect(component.hasNumber(stringTeste)).toBe(true);
  });

  it('Should check for a special character on the string', () => {
    var stringTeste: string = 'A3@Eeet';

    expect(component.hasSpecialCharacter(stringTeste)).toBe(true);
});

it('Should check for a capital letter on the string', () => {
  var stringTeste: string = 'A3@Eeet';

  expect(component.hasCapitalLetter(stringTeste)).toBe(true);
});

it('must verify that the password is valid', () => {
  var validPassword: string = 'A3@Eeet';
  var unvalidPassword: string = 'sda';

  expect(component.validationPassword(validPassword)).toBe(true);
  expect(component.validationPassword(unvalidPassword)).toBe(false);
});

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`errors has default value`, () => {
    expect(component.errors).toEqual([]);
  });

  it(`registerFail has default value`, () => {
    expect(component.registerFail).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      spyOn(FormBaseComponent.prototype, 'configureFormBaseValidation');
      component.ngAfterViewInit();
      expect(
        FormBaseComponent.prototype.configureFormBaseValidation
      ).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('makes expected calls', () => {
      const accountServiceStub: AccountService = fixture.debugElement.injector.get(
        AccountService
      );
      const ngxSpinnerServiceStub: NgxSpinnerService = fixture.debugElement.injector.get(
        NgxSpinnerService
      );

      fixture.detectChanges();
      spyOn(component, 'loadSucces').and.callThrough();
      spyOn(component, 'loadFail').and.callThrough();
      spyOn(accountServiceStub, 'register').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();

      component.register();
      if (component.registerForm.valid && component.registerForm.dirty) {
        expect(component.loadSucces).toHaveBeenCalled();
        expect(accountServiceStub.register).toHaveBeenCalled();
        expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
      }
      else {
        expect(component.loadFail).toHaveBeenCalled();
      }


    });
  });

  describe('loadSucces', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const toastrServiceStub: ToastrService = fixture.debugElement.injector.get(
        ToastrService
      );
      const ngxSpinnerServiceStub: NgxSpinnerService = fixture.debugElement.injector.get(
        NgxSpinnerService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(toastrServiceStub, 'success').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
      component.loadSucces();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(toastrServiceStub.success('Cadastro realizado com Sucesso!', 'Bem vindo!')).toHaveBeenCalled();
      expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();

    });
  });

  describe('loadFail', () => {
    it('makes expected calls', () => {
      const toastrServiceStub: ToastrService = fixture.debugElement.injector.get(
        ToastrService
      );
      const ngxSpinnerServiceStub: NgxSpinnerService = fixture.debugElement.injector.get(
        NgxSpinnerService
      );
      spyOn(toastrServiceStub, 'error').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
      component.loadFail('error');
      expect(component.registerFail).toBe(true);
      expect(toastrServiceStub.error).toHaveBeenCalled();
      expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
    });
  });
});
