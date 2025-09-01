import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../api/transactions.service';
import { AuthService } from '../../core/auth.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector:'app-transactions',
  standalone: true,
  templateUrl:'./transactions.component.html',
  imports: [CommonModule, MatTableModule, DecimalPipe, DatePipe]
})
export class TransactionsComponent implements OnInit {
  rows:any[]=[]; displayedColumns=['id','date','from','to','amt']; loading=true; error:string|undefined;
  constructor(private tx:TransactionsService, private auth:AuthService){}
  ngOnInit(){
    // Show all transactions from :8083 as requested
    this.tx.list().pipe(finalize(()=> this.loading=false)).subscribe({
      next: r => { this.rows = r; },
      error: e => { this.error = (e?.message)||'Failed to load transactions'; }
    });
  }
}
