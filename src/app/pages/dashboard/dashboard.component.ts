import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../api/accounts.service';
import { TransactionsService } from '../../api/transactions.service';
import { AuthService } from '../../core/auth.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { forkJoin } from 'rxjs';

@Component({
  selector:'app-dashboard',
  standalone: true,
  templateUrl:'./dashboard.component.html',
  imports: [CommonModule, MatTableModule, MatCardModule, DecimalPipe, DatePipe]
})
export class DashboardComponent implements OnInit {
  totalAccounts=0; totalBalance=0; recent:any[]=[]; loading=true; error:string|undefined;
  displayedColumns = ['date','amt'];
  // Static notifications to show on dashboard
  notifications: { type: 'info'|'success'|'warn'; text: string }[] = [
    { type: 'warn', text: 'You have 1 pending transaction awaiting approval.' },
    { type: 'info', text: 'New transaction alert: INR 1,000.00 credited.' },
    { type: 'success', text: 'OTP sent successfully to your registered email/mobile.' }
  ];
  iconMap: Record<string,string> = { success: '✅', warn: '⚠️', info: 'ℹ️' };

  constructor(private acc:AccountsService, private txs:TransactionsService, public auth:AuthService){}

  ngOnInit(){
    // Use available services to populate overview; fall back to full lists
    this.loading = true; this.error = undefined;
    forkJoin({
      accounts: this.acc.list(),
      tx: this.txs.list()
    }).subscribe({
      next: ({accounts, tx}) => {
        this.totalAccounts = accounts.length;
        this.totalBalance = accounts.reduce((sum, a:any)=> sum + (Number(a.balance)||0), 0);
        // sort recent by date desc and take 5
        const parse = (d:any)=> new Date(d || 0).getTime();
        this.recent = [...tx].sort((a:any,b:any)=> parse(b.date_transaction) - parse(a.date_transaction)).slice(0,5);
        this.loading=false;
      },
      error: e => { this.error = e?.message || 'Failed to load dashboard'; this.loading=false; }
    });
  }
}
