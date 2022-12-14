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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });


  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`timer has default value`, () => {
    expect(component.timer).toEqual(600);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const weatherServiceStub: WeatherService = fixture.debugElement.injector.get(
        WeatherService
      );
      spyOn(weatherServiceStub, 'getWeather').and.callThrough();

      component.ngOnInit();

      expect(weatherServiceStub.getWeather).toHaveBeenCalled();
    });

    it('should return weather if user allow locallocation', () => {
      var test!: Geolocation;
      spyOnProperty(navigator, 'geolocation').and.returnValue(test);

      component.ngOnInit();
    })
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
  })

  describe('updateTime', () => {
    it('should update timer', () => {
      let logoutSpy = spyOn(component, 'logout');
      jasmine.clock().install();
      component.updateTime();
      jasmine.clock().tick(610000);
      expect(logoutSpy).toHaveBeenCalled();
    });
  });

});

