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
export class CardListComponent implements OnInit {
  public cardsList: Cards[] = []; // Lista completa de cartões
  public filteredCards: Cards[] = []; // Lista de cartões filtrados pelo usuário
  public noCardsTxt: string = 'Sem registros.';

  // Variáveis para a paginação
  public currentPage: number = 1;
  public itemsPerPage: number = 5; // Número de itens por página
  public totalPages: number = 1;

  constructor(
    public readonly baseService: BaseService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCards();
  }

  public loadCards(): void {
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

  get paginatedCards(): Cards[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredCards.slice(start, end); // Pagina os cartões já filtrados
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
    return this.filteredCards.length > 0;
  }
}
