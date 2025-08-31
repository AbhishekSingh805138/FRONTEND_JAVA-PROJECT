import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../api/transactions.service';
import { AuthService } from '../../core/auth.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector:'app-transactions',
  standalone: true,
  templateUrl:'./transactions.component.html',
  imports: [CommonModule, MatTableModule, DecimalPipe, DatePipe]
})
export class TransactionsComponent implements OnInit {
  rows:any[]=[]; displayedColumns=['id','date','from','to','amt']; loading=true;
  constructor(private tx:TransactionsService, private auth:AuthService){}
  ngOnInit(){ const uid=this.auth.currentUserId ?? 0; this.tx.listByUser(uid).subscribe(r=>{ this.rows=r; this.loading=false; }); }
}
