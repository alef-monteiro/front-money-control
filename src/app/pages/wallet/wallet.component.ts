import {Component, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {Expenses} from '../../../shared/models/expenses';
import {BaseService} from '../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {DefaultHomeLayoutComponent} from '../../components/default-home-layout/default-home-layout.component';

@Component({
  selector: 'app-wallet',
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf,
    DefaultHomeLayoutComponent
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit {
  public expensesList: Expenses[] = []; // Lista completa de despesas
  public filteredExpenses: Expenses[] = []; // Lista filtrada para o usuário logado
  public noExpensesTxt: string = 'Sem registros.';

  // Variáveis para paginação
  public currentPage: number = 1;
  public itemsPerPage: number = 5; // Número de itens por página
  public totalPages: number = 1;

  constructor(
    public readonly baseService: BaseService,
    private readonly toastr: ToastrService
  ) {
  }

  public ngOnInit(): void {
    this.loadExpenses();
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

  // public getCardByID(id: number) {
  //   if(this.expensesList.find((expense) => expense.card === id)){
  //     console.log('Cartão Válido')
  //     this.baseService.getCardDataById(id).subscribe({
  //       next: (data: any) => {
  //
  //       }
  //     })
  //   }
  // }

  get paginatedExpenses(): Expenses[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredExpenses.slice(start, end); // Pagina as despesas já filtradas
  }


  // Funções para navegação entre páginas
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

  // Verifica se existem despesas para o usuário logado
  public hasExpenses(): boolean {
    return this.filteredExpenses.length > 0;
  }


}
