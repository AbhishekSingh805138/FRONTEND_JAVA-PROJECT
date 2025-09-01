import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Account, AccountCreate, BalanceUpdate, Transaction } from '../shared/models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  // Point directly to accounts backend (proxied bypassed) on :8082
  base = `${environment.accountsBase}`;
  constructor(private http: HttpClient) {}
  private normalize = (a:any): Account => ({
    id: a.id ?? a.accountId,
    userId: a.userId ?? a.userID,
    accountType: a.accountType,
    balance: a.balance ?? a.accountBalance,
    currency: a.currency ?? 'USD',
    nickname: a.nickname,
    status: a.status
  });

  list(){
    return this.http
      .get<any[]>(this.base, { headers: { Accept: 'application/json' } })
      .pipe(map(arr => arr.map(this.normalize)));
  }

  byUser(userId:number){
    // Backend may not support this filter; load all and filter client-side
    return this.list().pipe(map(arr => arr.filter(a => Number(a.userId) === Number(userId))));
  }

  get(id:number){
    return this.http
      .get<any>(`${this.base}/${id}`, { headers: { Accept: 'application/json' } })
      .pipe(map(this.normalize));
  }
  create(b: any){
    const payload = {
      accountType: b.accountType,
      accountBalance: b.accountBalance,
      userId: b.userId,
      secretPassword: b.secretPassword
    };
    return this.http
      .post<any>(this.base, payload, { headers: { 'Content-Type': 'application/json', Accept:'application/json' } })
      .pipe(map(this.normalize));
  }
  update(id:number, b: Partial<Account>){ return this.http.put<Account>(`${this.base}/${id}`, b); }
  updateBalance(id:number, b: BalanceUpdate){ return this.http.put<Account>(`${this.base}/${id}/updateBalance`, b); }
  statements(id:number){ return this.http.get<Transaction[]>(`${this.base}/${id}/statements`); }
}
