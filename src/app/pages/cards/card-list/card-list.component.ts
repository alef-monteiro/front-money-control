import {Component, Input, OnInit} from '@angular/core';
import {Cards} from '../../../../shared/models/cards';
import {BaseService} from '../../../../shared/base.service';
import {ToastrService} from 'ngx-toastr';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {CardUpdateComponent} from '../card-update/card-update.component';

@Component({
  selector: 'app-card-list',
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    CardUpdateComponent
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit {
  @Input('cardID') cardId: number = 0;

  public cardsList: Cards[] = []; // Lista completa de cartões
  public filteredCards: Cards[] = []; // Lista de cartões filtrados pelo usuário
  public noCardsTxt: string = 'Sem registros.';
  public openWindow: boolean = false;

  // Variáveis para a paginação
  public currentPage: number = 1;
  public itemsPerPage: number = 5; // Número de itens por página
  public totalPages: number = 1;


  constructor(
    public readonly baseService: BaseService,
    private readonly toastr: ToastrService
  ) {
  }


  ngOnInit() {
    this.loadCards();
  }


  public loadCards(): void {
    this.baseService.getCardData().subscribe({
      next: (data: any) => {
        this.cardsList = data;
        this.filteredCards = this.cardsList.filter(
          (card) => card.user === this.baseService.user?.id
        );
        this.recalculatePagination(); // Atualiza as páginas dinamicamente
      },
      error: (error) => {
        console.error('Erro ao carregar os cartões:', error);
        this.toastr.error('Erro ao carregar os cartões. Tente novamente.');
      },
    });
  }

  private recalculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCards.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
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

  public onOpenWindow(id: number) {
    this.openWindow = true;
    this.cardId = id;
  }

  public onCloseWindow(): void {
    this.openWindow = false;
    this.loadCards(); // Atualiza a lista de cartões após fechar a janela
  }

  onDelete(id: number) {
    if (confirm('Deseja deletar?')) {
      this.baseService.deleteCard(id).subscribe({
        next: (data: any) => {
          this.toastr.success('Deletado com sucesso!')
          this.loadCards()
        },
        error: (data: any) => {
          console.log(data)
          this.toastr.error('Erro ao deletar!')
          this.loadCards()
        }
      })
    }
  }
}
