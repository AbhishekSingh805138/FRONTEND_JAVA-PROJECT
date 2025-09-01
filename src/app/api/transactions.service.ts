// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { Transaction, TransferReq } from '../shared/models';
// import { map } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
// export class TransactionsService {
//   // Point directly to transactions backend (proxied to :8083)
//   base = `${environment.transactionsBase}`;
//   constructor(private http: HttpClient) {}

//   // Normalize different backend field names to the app's Transaction model
//   private normalize = (t: any): Transaction => ({
//     id: t.id ?? t.transactionId,
//     frmAccountId: t.frmAccountId,
//     toAccountId: t.toAccountId,
//     transactionType: t.transactionType,
//     amount: t.amount,
//     userId: t.userId,
//     date_transaction: t.date_transaction ?? t.dateTransaction
//   });

//   list(){
//     return this.http
//       .get<any[]>(this.base, { headers: { Accept: 'application/json' } })
//       .pipe(map(arr => arr.map(this.normalize)));
//   }

//   listByUser(userId:number){
//     // If backend lacks this route, callers can filter client-side
//     return this.http
//       .get<any[]>(`${this.base}/user/${userId}`, { headers: { Accept: 'application/json' } })
//       .pipe(map(arr => arr.map(this.normalize)));
//   }

//   get(id:number){
//     return this.http
//       .get<any>(`${this.base}/${id}`, { headers: { Accept: 'application/json' } })
//       .pipe(map(this.normalize));
//   }

//   create(b: TransferReq){
//     const payload = { ...b, transactionType:'TRANSFER' } as any;
//     return this.http
//       .post<any>(this.base, payload, { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } })
//       .pipe(map(this.normalize));
//   }

//   byAccount(accountId:number){
//     return this.http
//       .get<any[]>(`${this.base}?accountId=${accountId}`, { headers: { Accept: 'application/json' } })
//       .pipe(map(arr => arr.map(this.normalize)));
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Transaction } from '../shared/models';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

// ✓ strongly-typed request
export interface TransferReq {
  frmAccountId: number;
  toAccountId: number;
  amount: number;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  base = `${environment.transactionsBase}`; // e.g. '/api/transactions'
  constructor(private http: HttpClient) {}

  private normalize = (t: any): Transaction => ({
    id: t.id ?? t.transactionId,
    frmAccountId: t.frmAccountId,
    toAccountId: t.toAccountId,
    transactionType: t.transactionType,
    amount: t.amount,
    userId: t.userId,
    date_transaction: t.date_transaction ?? t.dateTransaction
  });

  list() {
    return this.http
      .get<any[]>(this.base, { headers: { Accept: 'application/json' } })
      .pipe(map(arr => arr.map(this.normalize)));
  }

  listByUser(userId: number) {
    return this.http
      .get<any[]>(`${this.base}/user/${userId}`, { headers: { Accept: 'application/json' } })
      .pipe(map(arr => arr.map(this.normalize)));
  }

  get(id: number) {
    return this.http
      .get<any>(`${this.base}/${id}`, { headers: { Accept: 'application/json' } })
      .pipe(map(this.normalize));
  }

  // ✅ ensure numeric, non-zero IDs before POST
  create(b: TransferReq) {
    const frmAccountId = Number(b.frmAccountId);
    const toAccountId  = Number(b.toAccountId);
    const amount       = Number(b.amount);

    if (!Number.isInteger(frmAccountId) || frmAccountId <= 0) {
      return throwError(() => new Error('Invalid from account'));
    }
    if (!Number.isInteger(toAccountId) || toAccountId <= 0) {
      return throwError(() => new Error('Invalid to account'));
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      return throwError(() => new Error('Invalid amount'));
    }

    const payload = {
      frmAccountId,
      toAccountId,
      amount,
      transactionType: 'TRANSFER',
      // (optional) if backend different names expect, send aliases too:
      fromAccountId: frmAccountId,
      destinationAccountId: toAccountId
    };

    return this.http
      .post<any>(this.base, payload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
      })
      .pipe(map(this.normalize));
  }

  byAccount(accountId: number) {
    return this.http
      .get<any[]>(`${this.base}?accountId=${Number(accountId)}`, { headers: { Accept: 'application/json' } })
      .pipe(map(arr => arr.map(this.normalize)));
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
