import {Component, OnInit} from '@angular/core';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseService} from '../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  public titleTxt: string = 'Faça seu cadastro';
  public questionTxt: string = 'Já tem uma conta?';
  public loginTxtLink: string = 'Entrar';
  public primaryBtnTxt: string = 'Guardar';
  public logoTxtLink: string = 'MoneyControl';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private baseService: BaseService,
    private toastr: ToastrService,
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public ngOnInit() {
    this.registerForm.markAllAsTouched();
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.baseService
        .register(
          this.registerForm.controls['username'].value,
          this.registerForm.controls['first_name'].value,
          this.registerForm.controls['last_name'].value,
          this.registerForm.controls['email'].value,
          this.registerForm.controls['password'].value
        )
        .subscribe({
          next: () => {
            console.log('Registro enviado com sucesso!');
            this.toastr.success(`Bem-vindo, ${this.registerForm.controls['username'].value}`).onTap
            this.router.navigate(['login']).then();
          },
          error: (err) => {
            console.error('Erro ao guardar:', err);
            this.toastr.error('Error com servidor. Por favor, tente mais tarde.')
            if (err.error) {
              const errorMessages: string[] = [];
              for (const field in err.error) {
                if (err.error.hasOwnProperty(field)) {
                  errorMessages.push(...err.error[field]);
                }
              }
              console.log('Mensagens de erro:', errorMessages);
              this.toastr.error(`${errorMessages}`)
            }
          },
        });
    } else {
      console.error('Formulário inválido. Por favor, verifique os campos.');
      this.toastr.warning('Formulário inválido. Por favor, verifique os campos.')
    }
  }
}
