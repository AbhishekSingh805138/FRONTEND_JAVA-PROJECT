import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../api/accounts.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector:'app-accounts',
  standalone: true,
  templateUrl:'./accounts.component.html',
  imports: [CommonModule, MatTableModule, DecimalPipe]
})
export class AccountsComponent implements OnInit {
  rows:any[]=[]; loading=true; displayedColumns=['id','type','bal']; error:string|undefined;
  constructor(private svc:AccountsService, private auth:AuthService, private r:Router){}
  ngOnInit(){
    // Show all accounts from 8082 (backend has no per-user endpoint matching our token sometimes)
    this.svc.list().subscribe({
      next: r=>{ this.rows=r; this.loading=false; },
      error: e=>{ this.error = (e?.message)||'Failed to load accounts'; this.loading=false; }
    });
  }
  open(row:any){ this.r.navigate(['/accounts', row.id]); }
}
