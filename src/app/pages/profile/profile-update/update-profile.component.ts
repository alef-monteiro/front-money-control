import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../../components/primary-input/primary-input.component';
import {BaseService} from '../../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-update',
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {
  @Output() closeWindow = new EventEmitter<boolean>();

  public updateForm!: FormGroup;
  public titleTxt = 'Atualizar';
  public primaryBtnTxt = 'Salvar';
  public backBtnTxt: string = 'Voltar';

  constructor(
    private readonly formBuilderProfile: FormBuilder,
    public baseService: BaseService,
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {
    this.updateForm = this.formBuilderProfile.group({
      id: this.baseService.user?.id,
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.updateForm.markAllAsTouched()
  }

  public onSubmit() {
    if (this.updateForm.valid) {
      // Recuperar a senha do sessionStorage
      const password = sessionStorage.getItem('password');

      // Criar o payload com a senha
      const payload = {...this.updateForm.value, password};

      this.baseService.updateProfile(payload).subscribe({
        next: () => {
          console.log('Perfil atualizado com sucesso!');
          this.toastr.success('Perfil atualizado com sucesso!');
          this.updateForm.reset();
          this.closeWindow.emit(true);
        },
        error: (err) => {
          console.error('Erro ao atualizar perfil:', err);
          this.toastr.error('Erro ao atualizar perfil');
        },
      });
    } else {
      console.log('Formulário inválido.');
      this.toastr.warning('Formulário inválido.');
      this.updateForm.markAllAsTouched();
    }
  }

  public toNavigate(action: string[]) {
    if (confirm('Deseja voltar?')) {
      this.router.navigate(action).then()
    }
  }
}
