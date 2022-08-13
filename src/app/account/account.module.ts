import { NgxSpinnerModule } from 'ngx-spinner';
import { AccountService } from './services/account.service';
import { AccountGuard } from './services/account.guard';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

import { AccountRoutingModule } from './account.route';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    AccountAppComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    NgxSpinnerModule
  ],
  providers: [
    AccountService,
    AccountGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
