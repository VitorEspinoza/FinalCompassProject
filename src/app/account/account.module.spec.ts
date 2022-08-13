import { RegisterComponent } from './register/register.component';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountModule } from './account.module';

describe('AccountModule', () => {
  let pipe: AccountModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AccountModule], imports: [FormsModule, ReactiveFormsModule], declarations: [RegisterComponent] });
    pipe = TestBed.inject(AccountModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
