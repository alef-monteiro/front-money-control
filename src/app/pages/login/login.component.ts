import {Component, OnInit} from '@angular/core';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseService} from '../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public loading = false;

  public titleTxt: string = "Entre na sua conta";
  public primaryBtnTxt: string = "Entrar";
  public questionTxt: string = "Já tem uma conta?";
  public registerTxtLink: string = "Cadastro";
  public logoTxtLink: string = "moneycontrol";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private baseService: BaseService,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]], // Synchronous validators in an array
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit() {
    this.loginForm.markAllAsTouched();
  }

  public toNavigate(route: string) {
    this.router.navigateByUrl(route).then();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.baseService.login(
        this.loginForm.value.email,
        this.loginForm.value.password,
      ).subscribe({
        next: () => {
          const user = this.baseService.user;
          if (user) {
            this.toastr.info(`Login com sucesso, ${user.first_name}!`)
            this.toastr.success(`Bem-vindo, ${user.full_name}!`)
            this.router.navigate(['home']).then();
          } else {
            this.loading = false;
            this.toastr.error(`Problemas ao fazer login. Tente novamente.`);
          }
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error('Error', err);
          this.toastr.error(`Erro inesperado! Tente novamente mais tarde.`);
        },
        })
    } else{
        this.loading = false;
        this.toastr.warning(
          'Sorry, Invalid form. Please try again.'
        )
      }
    }

}
