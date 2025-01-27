import {Injectable} from '@angular/core';
import {URLS} from './urls';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  public readonly endpoints = {
    // Usuários
    registerUser: URLS.BASE + URLS.REGISTER,
    loginUser: URLS.BASE + URLS.LOGIN,
    logoutUser: URLS.BASE + URLS.LOGOUT,
    userProfile: URLS.BASE + URLS.USERS,
    userProfileById: (id: number) => URLS.BASE + URLS.USERS + id + '/',
    userUpdate: (id:number) => URLS.BASE + URLS.USERS + id + '/',
    deleteUser: (id:number) => URLS.BASE + URLS.USERS + id + '/',


    // Cartões
    cardsData: URLS.BASE + URLS.CARDS,
    cardById: (id: number) => URLS.BASE + URLS.CARDS + id + '/',
    cardUpdate: (id: number) => URLS.BASE + URLS.CARDS + id + '/',
    cardDelete: (id: number) => URLS.BASE + URLS.CARDS + id + '/',

    // Despesas
    expensesData: URLS.BASE + URLS.EXPENSES,
    expensesById: (id: number) => URLS.BASE + URLS.EXPENSES + id + '/',
    expenseDelete: (id: number) => URLS.BASE + URLS.EXPENSES + id + '/',
    expenseUpdate: (id: number) => URLS.BASE + URLS.EXPENSES + id + '/',

    //Categorias  de Despesa
    categoryData: URLS.BASE + URLS.CARDS + URLS.CATEGORIES,
    categoryById: (id: number) => URLS.BASE + URLS.CATEGORIES + id + '/',

    //Dashboard ações
    dashboardData: URLS.BASE + URLS.DASHBOARD,
    totalBalance: URLS.BASE + URLS.DASHBOARD + 'total_balance/',
    userTotalExpenses: URLS.BASE + URLS.DASHBOARD +   'user_expenses/',
    monthlySummary: URLS.BASE + URLS.DASHBOARD + 'monthly_summary/',
    cardStatementById: (id: number) => URLS.BASE + URLS.DASHBOARD + 'cardStatement/' + id,
  };

  constructor() {
  }
}
