import {Component, OnInit} from '@angular/core';
import {Cards} from '../../../../shared/models/cards';
import {BaseService} from '../../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-card-list',
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit{
  public cardsList: Cards[] = [];
  public noCardsTxt: string = 'Sem registros.';

  // Variáveis para a paginação
  public currentPage: number = 1;
  public itemsPerPage: number = 5;  // Defina o número de itens por página
  public totalPages: number = 1;

  constructor(private readonly baseService: BaseService,
              private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.baseService.getCardData().subscribe({
      next: (data: any) => {
        this.cardsList = data;
        this.totalPages = Math.ceil(this.cardsList.length / this.itemsPerPage);
      },
      error: (error) => {
        console.error('Erro ao carregar os cartões:', error);
        this.toastr.error('Erro ao carregar os cartões. Tente novamente.');
      },
    });
  }

  // Metodo para obter os cartões da página atual
  get paginatedCards(): Cards[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.cardsList.slice(start, end);
  }

  // Funções para navegação entre páginas
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Verifica se existem cartões para o usuário
  public hasCards(): boolean {
    return this.cardsList.some(card => card.user === this.baseService.user?.id);
  }
}
