import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BaseService} from '../../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {PrimaryInputComponent} from '../../../components/primary-input/primary-input.component';
import {Cards} from '../../../../shared/models/cards';

@Component({
  selector: 'app-wallet-register',
  imports: [
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  templateUrl: './wallet-register.component.html',
  styleUrl: './wallet-register.component.scss'
})
export class WalletRegisterComponent implements OnInit {
  @Output() closeWindow = new EventEmitter<boolean>();
  public registerForm: FormGroup;
  public titleRegisterTxt: string = 'Registrar Gasto';
  public saveBtnTxt: string = 'Salvar';
  public backBtnTxt: string = 'Voltar';

  public cardsList: Cards[] = []; // Lista completa de cartões
  public filteredCards: Cards[] = []; // Lista de cartões filtrados pelo usuário
  public noCardsTxt: string = 'Sem registros.';


  constructor(
    private readonly formBuilderCard: FormBuilder,
    public baseService: BaseService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
  ) {
    this.registerForm = this.formBuilderCard.group({
      user: this.baseService.user?.id,
      card: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.maxLength(10)]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.minLength(5)]],
      payment_type: ['', [Validators.required]],
      purchase_date: ['', [Validators.required, Date.now]],
    });
  }

  ngOnInit() {
    this.loadCards()
  }

  public onSubmit() {
    if (this.registerForm.invalid && confirm('Deseja cadastrar?')) {
      this.baseService.postExpense(this.registerForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success(this.registerForm.value.description, ' registrado!');
          this.closeWindow.emit(true);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Erro ao registrar despesa!');
        }
      })
    }
    else {
      this.toastr.error('Formulário inválido');
    }
  }

  public toNavigate(action: string[]) {
    if (confirm('Deseja voltar?')) {
      this.router.navigate(action).then()
    }
  }

  public loadCards(): void {
    this.baseService.getCardData().subscribe({
      next: (data: any) => {
        this.cardsList = data; // Carrega todos os cartões
        this.filteredCards = this.cardsList.filter(
          (card) => card.user === this.baseService.user?.id
        ); // Filtra os cartões pelo ID do usuário
      },
      error: (error) => {
        console.error('Erro ao carregar os cartões:', error);
        this.toastr.error('Erro ao carregar os cartões. Tente novamente.');
      }
    })
  }
}
