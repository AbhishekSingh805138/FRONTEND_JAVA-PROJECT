import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Transaction, TransferReq } from '../shared/models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  // Point directly to transactions backend (proxied to :8083)
  base = `${environment.transactionsBase}`;
  constructor(private http: HttpClient) {}

  // Normalize different backend field names to the app's Transaction model
  private normalize = (t: any): Transaction => ({
    id: t.id ?? t.transactionId,
    frmAccountId: t.frmAccountId,
    toAccountId: t.toAccountId,
    transactionType: t.transactionType,
    amount: t.amount,
    userId: t.userId,
    date_transaction: t.date_transaction ?? t.dateTransaction
  });

  list(){
    return this.http
      .get<any[]>(this.base, { headers: { Accept: 'application/json' } })
      .pipe(map(arr => arr.map(this.normalize)));
  }

  listByUser(userId:number){
    // If backend lacks this route, callers can filter client-side
    return this.http
      .get<any[]>(`${this.base}/user/${userId}`, { headers: { Accept: 'application/json' } })
      .pipe(map(arr => arr.map(this.normalize)));
  }

  get(id:number){
    return this.http
      .get<any>(`${this.base}/${id}`, { headers: { Accept: 'application/json' } })
      .pipe(map(this.normalize));
  }

  create(b: TransferReq){
    return this.http.post<any>(this.base, { ...b, transactionType:'TRANSFER' }).pipe(map(this.normalize));
  }

  byAccount(accountId:number){
    return this.http
      .get<any[]>(`${this.base}?accountId=${accountId}`, { headers: { Accept: 'application/json' } })
      .pipe(map(arr => arr.map(this.normalize)));
  }
}
