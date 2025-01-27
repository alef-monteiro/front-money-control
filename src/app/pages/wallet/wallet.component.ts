import {Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Expenses} from '../../../shared/models/expenses';
import {BaseService} from '../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {DefaultHomeLayoutComponent} from '../../components/default-home-layout/default-home-layout.component';
import {WalletRegisterComponent} from './wallet-register/wallet-register.component';
import {Cards} from '../../../shared/models/cards';

@Component({
  selector: 'app-wallet',
  imports: [
    DecimalPipe,
    DefaultHomeLayoutComponent,
    WalletRegisterComponent
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit {
  public expensesList: Expenses[] = []; // Lista completa de despesas
  public filteredExpenses: Expenses[] = []; // Lista filtrada para o usuário logado
  public openWindow: boolean = false;
  public currentPage: number = 1;

  public itemsPerPage: number = 5;
  public totalPages: number = 1;

  public cardsList: Cards[] = []; // Lista completa de cartões
  public filteredCards: Cards[] = []; // Lista de cartões filtrados pelo usuário
  public noCardsTxt: string = 'Sem registros.';

  public noExpensesTxt: string = 'Sem registros.';
  public addExpenseTxt: string = 'Novo';


  constructor(
    public readonly baseService: BaseService,
    private readonly toastr: ToastrService
  ) {
  }

  public onCloseWindow() {
    this.openWindow = false;
  }

  public onOpenWindow() {
    this.openWindow = true;
  }

  public ngOnInit(): void {
    this.loadExpenses();
    this.loadCard();
  }

  public loadExpenses(): void {
    this.baseService.getExpenses().subscribe({
      next: (data: any) => {
        this.expensesList = data; // Carrega todas as despesas
        this.filteredExpenses = this.expensesList.filter(
          (expense) => expense.user === this.baseService.user?.id
        ); // Filtra as despesas do usuário logado
        this.totalPages = Math.ceil(this.filteredExpenses.length / this.itemsPerPage);
      },
      error: (error) => {
        console.error('Erro ao carregar as despesas:', error);
        this.toastr.error('Erro ao carregar as despesas. Tente novamente.');
      },
    });
  }

  public loadCard(): void {
    this.baseService.getCardData().subscribe({
      next: (data: any) => {
        this.cardsList = data; // Carrega todos os cartões
        this.filteredCards = this.cardsList.filter(
          (card) => card.user === this.baseService.user?.id
        ); // Filtra os cartões pelo ID do usuário
        this.totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
      },
      error: (error) => {
        console.error('Erro ao carregar os cartões:', error);
        this.toastr.error('Erro ao carregar os cartões. Tente novamente.');
      },
    });
  }




  get paginatedExpenses(): Expenses[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredExpenses.slice(start, end); // Pagina as despesas já filtradas
  }

  public goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public hasExpenses(): boolean {
    return this.filteredExpenses.length > 0;
  }

  public onDelete(id: number) {
    this.baseService.deleteExpense(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.toastr.success('Deletado com sucesso.')
        this.toastr.info('Atualize a tela.')
      },
      error: (error) => {
        console.error('Erro ao carregar as despesas:', error);
        this.toastr.error('Erro ao deletar as despesas.');
      }
    })

  }
}
