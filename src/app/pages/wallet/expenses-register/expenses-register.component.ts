import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BaseService} from '../../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Expenses} from '../../../../shared/models/expenses';
import {PrimaryInputComponent} from '../../../components/primary-input/primary-input.component';
import {NgForOf} from '@angular/common';
import {Cards} from '../../../../shared/models/cards';

@Component({
  selector: 'app-expenses-register',
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent,
    NgForOf
  ],
  templateUrl: './expenses-register.component.html',
  styleUrl: './expenses-register.component.scss'
})
export class ExpensesRegisterComponent implements OnInit {
  @Output() closeWindow = new EventEmitter<boolean>();

  public registerForm!: FormGroup;
  public cardsList: Cards[] = []; // Lista completa de cartões
  public filteredCards: Cards[] = []; // Lista de cartões filtrados pelo usuário
  public noCardsTxt: string = 'Sem registros.';

  // Definições das opções de categoria e tipo de pagamento
  public categoryChoices = [
    ['alimentação', 'Alimentação'],
    ['transporte', 'Transporte'],
    ['lazer', 'Lazer'],
    ['moradia', 'Moradia'],
    ['saúde', 'Saúde']
  ];

  public paymentChoices = [
    ['credito', 'Crédito'],
    ['debito', 'Débito'],
    ['dinheiro', 'Dinheiro'],
    ['pix', 'Pix']
  ];

  public titleRegisterTxt: string = 'Nova despesa.';
  public saveBtnTxt: string = 'Salvar';
  public backBtnTxt: string = 'Voltar';

  constructor(
    private readonly formBuilder: FormBuilder,
    public baseService: BaseService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      user: this.baseService.user?.id,
      card: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      payment_type: ['', [Validators.required]],
      purchase_date: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadCards();
    this.registerForm.patchValue({
      purchase_date: new Date().toISOString().substring(0, 10) // Definindo a data de hoje no formato YYYY-MM-DD
    });
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      const expenseData: Expenses = this.registerForm.value;
      console.log(expenseData)

      this.baseService.postExpense(expenseData).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success(expenseData.description, 'Registrado com sucesso!');
          this.closeWindow.emit(true);
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error(error.msg || 'Erro ao registrar a despesa');
        }
      });
    } else {
      this.toastr.error('Erro no formulário. Verifique todos os campos.');
      this.highlightInvalidFields();
    }
  }

  public loadCards(): void {
    this.baseService.getCardData().subscribe({
      next: (data: any) => {
        this.cardsList = data;
        this.filteredCards = this.cardsList.filter(
          (card) => card.user === this.baseService.user?.id
        );
      },
      error: (error) => {
        console.error('Erro ao carregar os cartões:', error);
        this.toastr.error('Erro ao carregar os cartões. Tente novamente.');
      },
    });
  }

  // Highlight invalid form fields
  private highlightInvalidFields() {
    Object.keys(this.registerForm.controls).forEach(field => {
      const control = this.registerForm.get(field);
      if (control?.invalid) {
        control?.markAsTouched();
      }
    });
  }

  public toNavigate(action: string[]) {
    if (confirm('Deseja voltar?')) {
      this.router.navigate(action).then();
    }
  }
}
