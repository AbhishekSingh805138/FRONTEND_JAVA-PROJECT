import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account, AccountCreate, BalanceUpdate, Transaction } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  base = `${environment.apiBase}/accounts`;
  constructor(private http: HttpClient) {}
  list(){ return this.http.get<Account[]>(this.base); }
  byUser(userId:number){ return this.http.get<Account[]>(`${this.base}/user/${userId}`); }
  get(id:number){ return this.http.get<Account>(`${this.base}/${id}`); }
  create(b: AccountCreate){ return this.http.post<Account>(this.base, b); }
  update(id:number, b: Partial<Account>){ return this.http.put<Account>(`${this.base}/${id}`, b); }
  updateBalance(id:number, b: BalanceUpdate){ return this.http.put<Account>(`${this.base}/${id}/updateBalance`, b); }
  statements(id:number){ return this.http.get<Transaction[]>(`${this.base}/${id}/statements`); }
}

