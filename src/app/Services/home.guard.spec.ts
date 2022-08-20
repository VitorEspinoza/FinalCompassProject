import { RegisterComponent } from './../account/register/register.component';
import { LocalStorageUtils } from 'src/app/utilities/localstorage';
import { TestBed } from '@angular/core/testing';
import { Router, CanDeactivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HomeGuard } from './home.guard';
import { Observable, Observer } from 'rxjs';

function createResponse(body: any) {
  return Observable.create((observer: Observer<any>) => {
      observer.next(body);
  });
}

describe('HomeGuard', () => {
  let service: HomeGuard;
  let localStorageUtils = new LocalStorageUtils();
  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    const angularFireAuthStub = () => ({
      authState: { subscribe: (f: (arg0: {}) => any) => f({}) }
    });
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        HomeGuard,
        { provide: Router, useFactory: routerStub },
        { provide: AngularFireAuth, useFactory: angularFireAuthStub }
      ]
    });
    service = TestBed.inject(HomeGuard);

  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('LocalStorageUtils instance created', () => {
    expect(service.LocalStorage).toEqual(localStorageUtils);
  });

  describe('canActivate', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.canActivate();
    });
  });
});
