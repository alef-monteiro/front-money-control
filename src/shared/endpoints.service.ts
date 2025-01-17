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

    // Cartões
    cardsData: URLS.BASE + URLS.CARDS + URLS.CARDS,
    cardById: (id: number) => URLS.BASE + URLS.CARDS + id + '/',

    // Despesas
    expensesData: URLS.BASE + URLS.CARDS + URLS.CARDS,
    expensesById: (id: number) => URLS.BASE + URLS.CARDS + id + '/',

    //Categorias  de Despesa
    categoryData: URLS.BASE + URLS.CARDS + URLS.CARDS,
    // categoryById: (id: number) => URLS.BASE + URLS.CARDS,

  };

  constructor() {
  }
}