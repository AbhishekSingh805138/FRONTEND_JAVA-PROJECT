import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../api/accounts.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector:'app-accounts',
  templateUrl:'./accounts.component.html',
  imports: [CommonModule, MatTableModule, DecimalPipe]
})
export class AccountsComponent implements OnInit {
  rows:any[]=[]; loading=true; displayedColumns=['id','type','bal'];
  constructor(private svc:AccountsService, private auth:AuthService, private r:Router){}
  ngOnInit(){
    const uid = this.auth.currentUserId ?? 0;
    this.svc.byUser(uid).subscribe(r=>{ this.rows=r; this.loading=false; });
  }
  open(row:any){ this.r.navigate(['/accounts', row.id]); }
}

