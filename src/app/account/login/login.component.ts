import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageUtils } from 'src/app/utilities/localstorage';
import { AccountService } from './../services/account.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent implements OnInit, AfterViewInit {


  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  errors: any[] = [];
  loginForm!: FormGroup;
  user!: User;
  authFail: boolean = false;
  emailValue: string = '';
  passwordValue: string = '';
  returnUrl: string;
  LocalStorage: LocalStorageUtils = new LocalStorageUtils;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private spinner: NgxSpinnerService) {
    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      password: {
        required: 'Informe a senha'
      }
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    super.configureMessagesBaseValidation(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    super.configureFormBaseValidation(this.formInputElements, this.loginForm);
  }

  login() {
    this.spinner.show();
    if (this.loginForm?.dirty && this.loginForm?.valid) {

      this.user = Object.assign({}, this.user, this.loginForm.value);
      this.accountService.login(this.user).then(
        () => this.loadSucces()
      ).catch(() => this.loadFail()) ;
      }

  }

  loadSucces() {
    this.spinner.hide();
    this.mudancasNaoSalvas = false;
    this.loginForm?.reset();
    this.router.navigate(['/home']);
    }


  loadFail(){
    this.spinner.hide();
    this.authFail = true;
  }


}
