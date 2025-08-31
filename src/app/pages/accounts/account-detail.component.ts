import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from '../../api/accounts.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector:'app-account-detail',
  standalone: true,
  templateUrl:'./account-detail.component.html',
  imports: [CommonModule, MatTableModule, DecimalPipe, DatePipe]
})
export class AccountDetailComponent implements OnInit {
  id!:number; acc:any; tx:any[]=[]; displayedColumns=['date','dir','amt'];
  constructor(private route:ActivatedRoute, private svc:AccountsService){}
  ngOnInit(){
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.svc.get(this.id).subscribe(a=>this.acc=a);
    this.svc.statements(this.id).subscribe(t=>this.tx=t);
  }
}
