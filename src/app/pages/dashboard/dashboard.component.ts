import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../api/accounts.service';
import { TransactionsService } from '../../api/transactions.service';
import { AuthService } from '../../core/auth.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector:'app-dashboard',
  standalone: true,
  templateUrl:'./dashboard.component.html',
  imports: [CommonModule, MatTableModule, MatCardModule, DecimalPipe, DatePipe]
})
export class DashboardComponent implements OnInit {
  accounts:any[]=[]; tx:any[]=[]; total=0; loading=true;
  constructor(private acc:AccountsService, private txs:TransactionsService, public auth:AuthService){}
  ngOnInit(){
    const uid = this.auth.currentUserId ?? 0;
    this.acc.byUser(uid).subscribe(a=>{
      this.accounts=a; this.total = a.reduce((s,x)=>s+(x.balance||0),0);
    });
    this.txs.listByUser(uid).subscribe(t=>{ this.tx = t.slice(0,5); this.loading=false; });
  }
}
