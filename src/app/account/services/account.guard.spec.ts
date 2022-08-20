import { LocalStorageUtils } from '../../utilities/localstorage';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { AccountGuard } from './account.guard';


describe('AccountGuard', () => {
  let service: AccountGuard;
  const localStorageTeste = new LocalStorageUtils;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: any) => ({}) });

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent],
      providers: [
        AccountGuard,
        { provide: Router, useFactory: routerStub }
      ]
    });
    service = TestBed.inject(AccountGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('LocalStorageUtils initializated', () => {
    expect(service.localStorageUtils).toEqual(localStorageTeste);
  });

  describe('canActivate', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      localStorage.setItem('compassProject.token', 'teste');
      service.canActivate();
      if (service.localStorageUtils.getTokenUser()) {
        expect(routerStub.navigate).toHaveBeenCalled();
      }

    });
  });


  describe('canDeactivate', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
    });
  });

});

