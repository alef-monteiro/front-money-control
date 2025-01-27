import {Component, OnInit} from '@angular/core';
import {BaseService} from '../../../shared/base.service';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';
import {DefaultHomeLayoutComponent} from '../../components/default-home-layout/default-home-layout.component';


@Component({
  selector: 'app-home',
  imports: [
    CurrencyPipe,
    DefaultHomeLayoutComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  totalBalance: number = 0;
  totalExpenses: number = 0;  // Total das despesas
  // monthlySummary: any[] = [];
  realBalance: number = 0;  // Saldo real

  constructor(private dashboardService: BaseService) {}

  ngOnInit(): void {
    this.loadTotalBalance();
    this.loadUserExpenses(); // Carregar despesas
    // this.loadMonthlySummary();
  }

  // Carrega o saldo total
  loadTotalBalance(): void {
    this.dashboardService.getTotalBalance().subscribe({
      next: (data) => {
        this.totalBalance = data.total_balance;
        this.calculateRealBalance();  // Atualiza o saldo real após carregar o totalBalance
      },
      error: (error) => {
        console.error('Erro ao carregar o saldo total:', error);
      }
    });
  }

  // Carrega as despesas do usuário e calcula o total
  loadUserExpenses(): void {
    this.dashboardService.getUserExpenses().subscribe({
      next: (data) => {
        this.totalExpenses = this.calculateTotalExpenses(data);
        this.calculateRealBalance();  // Atualiza o saldo real após carregar as despesas
      },
      error: (error) => {
        console.error('Erro ao carregar despesas:', error);
      }
    });
  }

  // Função para calcular o total das despesas
  calculateTotalExpenses(expenses: any[]): number {
    return expenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount); // Garantir que amount seja numérico
      return sum + (isNaN(amount) ? 0 : amount); // Se amount não for numérico, ignorar
    }, 0);
  }

  // Atualiza o saldo real (totalBalance - totalExpenses)
  calculateRealBalance(): void {
    this.realBalance = this.totalBalance - this.totalExpenses;
  }

  // // Carrega o resumo mensal
  // loadMonthlySummary(): void {
  //   this.dashboardService.getMonthlySummary().subscribe({
  //     next: (data) => {
  //       this.monthlySummary = data;
  //     },
  //     error: (error) => {
  //       console.error('Erro ao carregar resumo mensal:', error);
  //     }
  //   });
  // }
}


