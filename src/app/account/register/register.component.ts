import { LocalStorageUtils } from 'src/app/utilities/localstorage';
import { AccountService } from './../services/account.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { User } from '../models/user';
import { CustomValidators } from '@narik/custom-validators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormBaseComponent implements OnInit, AfterViewInit {


  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  errors: any[] = [];
  registerForm!: FormGroup;
  user!: User;
  registerFail: boolean = false;
  emailValue: string = '';
  passwordValue: string = '';
  confirmPasswordValue: string = '';
  LocalStorage: LocalStorageUtils = new LocalStorageUtils;


  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      password: {
        required: 'Informe a senha',
        minLength: 'A senha deve possuir pelo menos 6 caracteres',
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        minLength: 'A senha deve possuir pelo menos 6 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };
    super.configureMessagesBaseValidation(this.validationMessages);
  }

  ngOnInit(): void {

    let password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/[A-Z]/), Validators.pattern(/[0-9]/),  Validators.pattern(/\W|_/)]);
    let confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(password)]);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  ngAfterViewInit(): void {
    super.configureFormBaseValidation(this.formInputElements, this.registerForm);
  }

  register() {
    if (this.registerForm?.dirty && this.registerForm?.valid) {
      this.spinner.show();
      this.user = Object.assign({}, this.user, this.registerForm.value);
      this.accountService.register(this.user).then(
        res => this.loadSucces()
      ).catch(error => this.loadFail(error)) ;
      }
  }

  loadSucces() {
    this.spinner.hide();
    this.mudancasNaoSalvas = false;
    let toast = this.toastr.success('Cadastro realizado com Sucesso!', 'Bem vindo!');
    this.registerForm?.reset();
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  loadFail(error: string){
    this.spinner.hide();
    this.registerFail = true;
    this.toastr.error(error, 'Ocorreu um erro!');
  }

  hasCapitalLetter(password: string) : boolean {
     return /[A-Z]/.test(password);
  }

  hasNumber(password: string) : boolean {
    return /[0-9]/.test(password);
  }

  hasSpecialCharacter(password: string) : boolean {
    return /\W|_/.test(password);
  }

  validationPassword(password: string) : boolean {
    if (this.hasCapitalLetter(password) && this.hasNumber(password) && this.hasSpecialCharacter(password) && password.length >= 6)
      return true;
    else
      return false;
  }
}
