import { RegisterComponent } from './register/register.component';
import { AccountGuard } from './services/account.guard';
import { AccountAppComponent } from './account.app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const accountRouterConfig: Routes = [
    {
        path: '', component: AccountAppComponent,
        children: [
            { path: 'register', component: RegisterComponent, canActivate: [AccountGuard], canDeactivate: [AccountGuard] },
            { path: 'login', component: LoginComponent, canActivate: [AccountGuard]}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(accountRouterConfig)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
