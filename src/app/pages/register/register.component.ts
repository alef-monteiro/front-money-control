import {Component} from '@angular/core';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup;

  public titleTxt: string = 'Faça seu cadastro';
  public questionTxt: string = 'Já tem uma conta?';
  public loginTxtLink: string = 'Entrar';
  public primaryBtnTxt: string = 'Guardar';
  public logoTxtLink: string = 'MoneyControl';

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      console.log(this.registerForm.value);
    }
  }
}
