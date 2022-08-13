import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AccountService } from './../account/services/account.service';
import { WeatherService } from './../Services/weather.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    const routerStub = () => ({});
    const angularFireAuthStub = () => ({});
    const accountServiceStub = () => ({ logout: () => ({}) });
    const weatherServiceStub = () => ({
      getWeather: (arg: any, arg1: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AngularFireAuth, useFactory: angularFireAuthStub },
        { provide: AccountService, useFactory: accountServiceStub },
        { provide: WeatherService, useFactory: weatherServiceStub }
      ]
    });
    spyOn(HomeComponent.prototype, 'refreshTime');
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`timer has default value`, () => {
    expect(component.timer).toEqual(600);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(HomeComponent.prototype.refreshTime).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const weatherServiceStub: WeatherService = fixture.debugElement.injector.get(
        WeatherService
      );
      spyOn(navigator.geolocation, 'getCurrentPosition');
      if (navigator.geolocation) {
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
      }
      spyOn(weatherServiceStub, 'getWeather').and.callThrough();
      component.ngOnInit();
      expect(weatherServiceStub.getWeather).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const accountServiceStub: AccountService = fixture.debugElement.injector.get(
        AccountService
      );
      spyOn(accountServiceStub, 'logout').and.callThrough();
      component.logout();
      expect(accountServiceStub.logout).toHaveBeenCalled();
    });
  });

});
