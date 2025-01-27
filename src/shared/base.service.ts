import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {EndpointsService} from './endpoints.service';
import {User} from './models/user';
import {Cards} from './models/cards';
import {Expenses} from './models/expenses';


interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly endPoints: EndpointsService,) {
  }

  get headers(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json', // Adiciona o token CSRF aos cabeçalhos
    });
    if (token) {
      headers = headers.append('Authorization', 'Bearer '.concat(token));
    }
    return headers;
  }

  public register(username: string, first_name: string, last_name: string, email: string, password: string) {
    return this.httpClient.post(
      this.endPoints.endpoints.registerUser,
      {username, first_name, last_name, email, password}
    )
  }

  public login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(
      this.endPoints.endpoints.loginUser,
      {email, password},
      {withCredentials: true}
    ).pipe(
      tap((value) => {
        console.log('Token recebido:', value.access);
        console.log('Token recebido:', value.refresh);

        // Armazene o token no sessionStorage
        sessionStorage.setItem('auth-token', value.access);
        sessionStorage.setItem('refresh', value.refresh);
      })
    );
  }

  get user(): User | null {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.warn('Nenhum token encontrado no armazenamento.');
      return null;
    }

    try {
      const payload = jwtDecode<any>(token);

      if (!payload.id || !payload.first_name || !payload.last_name || !payload.email) {
        console.error('Token JWT não contém as informações esperadas:', payload);
        return null;
      }


      return {
        id: payload.id,
        full_name: payload.full_name,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        active: true,
        created_at: payload.created_at ? new Date(payload.created_at) : new Date(), // Substitua "new Date()" por outra lógica, se necessário
        modified_at: payload.modified_at ? new Date(payload.modified_at) : new Date(), // Substitua "new Date()" por outra lógica, se necessário
      };
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }

  public updateProfile(data: User) {
    return this.httpClient.patch(
      this.endPoints.endpoints.userUpdate(data.id),
      data,
      {headers: this.headers, withCredentials: true}
    )
  }

  public deleteProfile(id: number) {
    return this.httpClient.delete(
      this.endPoints.endpoints.deleteUser(id),
      {headers: this.headers, withCredentials: true}
    )
  }

  public getUserById(id: number) {
    return this.httpClient.get(
      this.endPoints.endpoints.userProfileById(id),
      {headers: this.headers, withCredentials: true}
    )
  }

  public logout():
    void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('refresh');
    console.log('Usuário desconectado.');
  }

  public getExpenses() {
    return this.httpClient.get(
      this.endPoints.endpoints.expensesData,
      {headers: this.headers, withCredentials: true}
    )
  }

  public getExpenseById(id: number) {
    return this.httpClient.get(
      this.endPoints.endpoints.expensesById(id),
      {headers: this.headers, withCredentials: true}
    )
  }

  public deleteExpense(id:number){
    return this.httpClient.delete(
      this.endPoints.endpoints.expenseDelete(id),
      {headers: this.headers, withCredentials: true}
    )
  }

  public postExpense(data: Expenses){
    return this.httpClient.post(
      this.endPoints.endpoints.expensesData,
      data,
      {headers: this.headers, withCredentials: true}
    )
  }

  public getCardData() {
    return this.httpClient.get(
      this.endPoints.endpoints.cardsData,
      {headers: this.headers, withCredentials: true}
    )
  }

  public postCardData(data: Cards) {
    return this.httpClient.post(
      this.endPoints.endpoints.cardsData,
      data,
      {headers: this.headers, withCredentials: true}
    )
  }

  public updateCard(data: Cards){
    return this.httpClient.patch(
      this.endPoints.endpoints.cardUpdate(data.id),
      data,
      {headers: this.headers, withCredentials: true}
    )
  }

  public deleteCard(id: number){
    return this.httpClient.delete(
      this.endPoints.endpoints.cardDelete(id),
      {headers: this.headers, withCredentials: true}
    )
  }


  public getCardDataById(id: number) {
    return this.httpClient.get(
      this.endPoints.endpoints.cardById(id),
      {headers: this.headers, withCredentials: true}
    )
  }

  public getCategories() {
    return this.httpClient.get(this.endPoints.endpoints.categoryData,
      {headers: this.headers, withCredentials: true})
  }

  public getCategoriesById(id: number) {
    return this.httpClient.get(this.endPoints.endpoints.categoryById(id),
      {headers: this.headers, withCredentials: true})
  }


  public getTotalBalance(): Observable<any> {
    return this.httpClient.get(
      this.endPoints.endpoints.totalBalance,
      {headers: this.headers, withCredentials: true}
    );
  }

  public getMonthlySummary(): Observable<any> {
    return this.httpClient.get(
      this.endPoints.endpoints.monthlySummary,
      {headers: this.headers, withCredentials: true}
    );
  }

  public getUserExpenses(): Observable<any> {
    return this.httpClient.get(
      this.endPoints.endpoints.userTotalExpenses,
      {headers: this.headers, withCredentials: true}
    );
  }

  public getCardStatement(cardId: number): Observable<any> {
    return this.httpClient.get(
      this.endPoints.endpoints.cardStatementById(cardId),
      {headers: this.headers, withCredentials: true}
    );
  }

}
