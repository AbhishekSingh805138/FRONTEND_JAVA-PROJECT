import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Transaction, TransferReq } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  base = `${environment.apiBase}/transactions`;
  constructor(private http: HttpClient) {}
  list(){ return this.http.get<Transaction[]>(this.base); }
  listByUser(userId:number){ return this.http.get<Transaction[]>(`${this.base}/user/${userId}`); }
  get(id:number){ return this.http.get<Transaction>(`${this.base}/${id}`); }
  create(b: TransferReq){ return this.http.post<Transaction>(this.base, { ...b, transactionType:'TRANSFER' }); }
  byAccount(accountId:number){ return this.http.get<Transaction[]>(`${this.base}?accountId=${accountId}`); }
}

