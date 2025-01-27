import {Component, EventEmitter, Input, numberAttribute, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrimaryInputComponent} from '../../../components/primary-input/primary-input.component';
import {BaseService} from '../../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Cards} from '../../../../shared/models/cards';

@Component({
  selector: 'app-card-update',
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  templateUrl: './card-update.component.html',
  styleUrl: './card-update.component.scss'
})
export class CardUpdateComponent implements OnInit {

  @Output() closeWindow = new EventEmitter<boolean>();
  @Input({transform: numberAttribute}) id!: number;


  public titleTxt: string = 'Atualizar';
  public updateCardForm!: FormGroup;
  public saveBtnTxt: string = 'Salvar';
  public backBtnTxt: string = 'Voltar';

  constructor(
    private readonly formBuilderCard: FormBuilder,
    private readonly baseService: BaseService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
  ) {
    this.updateCardForm = this.formBuilderCard.group({
      id: this.id,
      user: this.baseService.user?.id,
      name: ['', [Validators.required, Validators.minLength(5)]],
      balance: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    });
  }

  ngOnInit() {
    this.updateCardForm = this.formBuilderCard.group({
      id: [this.id],
      user: [this.baseService.user?.id],
      name: ['', [Validators.required, Validators.minLength(5)]],
      balance: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
    });

    if (this.id) {
      console.log('ID recebido:', this.id);
      // Aqui você pode carregar os dados do cartão pelo ID, se necessário
    }
  }


  public onSubmit() {
    if (this.updateCardForm.valid) {
      const cardData: Cards = this.updateCardForm.value;

      this.baseService.updateCard(cardData).subscribe({
        next: () => {
          this.toastr.success(cardData.name, 'Atualizado com sucesso!');
          this.closeWindow.emit(true);
        },
        error: () => {
          this.toastr.error('Erro ao atualizar o cartão. Tente novamente.');
        },
      });
    } else {
      this.toastr.error('Por favor, preencha o formulário corretamente.');
    }
  }


  public toNavigate(action: string[]) {
    if (confirm('Deseja voltar?')) {
      this.router.navigate(action).then()
    }
  }

}
