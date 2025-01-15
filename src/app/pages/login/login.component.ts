import {Component} from '@angular/core';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public titleTxt: string = "Entre na sua conta";
  public primaryBtnTxt: string = "Entrar";
  public questionTxt: string = "Já tem uma conta?";
  public registerTxtLink: string = "Cadastro";

  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]], // Synchronous validators in an array
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  public toNavigate(route: string) {
    this.router.navigateByUrl(route).then();
  }

  onSubmit() {
    if (this.loginForm.valid) {
        console.log(this.loginForm.value);
    }
  }
}
