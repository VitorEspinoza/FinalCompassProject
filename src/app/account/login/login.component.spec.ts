import { User } from './../models/user';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from './../services/account.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const ngxSpinnerServiceStub = () => ({
      show: () => ({}),
      hide: () => ({})
    });
    const accountServiceStub = () => ({
      login: (user: User) => ({ then: () => ({ catch: () => ({}) }) })
    });
    const formBuilderStub = () => ({ group: (object: any) => ({}) });
    const activatedRouteStub = () => ({ snapshot: { queryParams: {} } });
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: NgxSpinnerService, useFactory: ngxSpinnerServiceStub },
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`errors has default value`, () => {
    expect(component.errors).toEqual([]);
  });

  it(`authFail has default value`, () => {
    expect(component.authFail).toEqual(false);
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


  describe('login', () => {
    it('makes expected calls', () => {
      const ngxSpinnerServiceStub: NgxSpinnerService = fixture.debugElement.injector.get(
        NgxSpinnerService
      );
      const accountServiceStub: AccountService = fixture.debugElement.injector.get(
        AccountService
      );
      spyOn(component, 'loadSucces').and.callThrough();
      spyOn(component, 'loadFail').and.callThrough();
      spyOn(ngxSpinnerServiceStub, 'show').and.callThrough();
      spyOn(accountServiceStub, 'login').and.callThrough();
      component.login();
      expect(component.loadSucces).toHaveBeenCalled();
      expect(component.loadFail).toHaveBeenCalled();
      expect(ngxSpinnerServiceStub.show).toHaveBeenCalled();
      expect(accountServiceStub.login).toHaveBeenCalled();
    });
  });

  describe('loadSucces', () => {
    it('makes expected calls', () => {
      const ngxSpinnerServiceStub: NgxSpinnerService = fixture.debugElement.injector.get(
        NgxSpinnerService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.loadSucces();
      expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('loadFail', () => {
    it('makes expected calls', () => {
      const ngxSpinnerServiceStub: NgxSpinnerService = fixture.debugElement.injector.get(
        NgxSpinnerService
      );
      spyOn(ngxSpinnerServiceStub, 'hide').and.callThrough();
      component.loadFail();
      expect(ngxSpinnerServiceStub.hide).toHaveBeenCalled();
    });
  });
});
