import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BaseService} from '../../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {Cards} from '../../../../shared/models/cards';
import {PrimaryInputComponent} from '../../../components/primary-input/primary-input.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-register',
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './card-register.component.html',
  styleUrl: './card-register.component.scss'
})
export class CardRegisterComponent {
  @Output() closeWindow = new EventEmitter<boolean>();
  public registerCardForm: FormGroup;
  public titleRegisterTxt: string = 'Registrar Cartão';
  public saveBtnTxt: string = 'Salvar';
  public backBtnTxt: string = 'Voltar';


  constructor(
    private readonly formBuilderCard: FormBuilder,
    private readonly baseService: BaseService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
  ) {
    this.registerCardForm = this.formBuilderCard.group({
      user: this.baseService.user?.id,
      name: ['', [Validators.required, Validators.minLength(5)]],
      balance: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    });
  }

  public toRegisterCard(): void {
    let cardData: Cards = this.registerCardForm.value;
    if (this.registerCardForm) {
      this.baseService.postCardData(cardData).subscribe({
          next: (response: any) => {
            console.log(this.registerCardForm.value);
            this.toastr.success(response.msg);
            this.closeWindow.emit(true);
          },
          error: (error: any) => {
            console.log(error);
            this.toastr.error(error.msg);
            this.closeWindow.emit(true);
          }
        }
      )
    }else{
      console.log('Formulário inválido.')
    }
  }

 public onSubmit() {
    let cardData: Cards = this.registerCardForm.value;
    if(this.registerCardForm.valid) {
      this.baseService.postCardData(cardData).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success(cardData.name,'Registrado com sucesso!');
          this.closeWindow.emit(true);
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error(error.msg);
        }
      })
    }
  }

  public toNavigate(action: string[]) {
    if(confirm('Deseja voltar?')){
      this.router.navigate(action).then()
    }
  }
}
