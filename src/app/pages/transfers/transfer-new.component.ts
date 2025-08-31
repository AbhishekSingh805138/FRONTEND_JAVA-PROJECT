import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../../api/accounts.service';
import { TransactionsService } from '../../api/transactions.service';
import { AuthService } from '../../core/auth.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector:'app-transfer-new',
  standalone: true,
  templateUrl:'./transfer-new.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    DecimalPipe
  ]
})
export class TransferNewComponent implements OnInit {
  form!: ReturnType<FormBuilder['group']>;
  myAccounts:any[]=[]; msg=''; loading=false;
  constructor(private fb:FormBuilder, private acc:AccountsService, private tx:TransactionsService, private auth:AuthService){
    this.form = this.fb.group({ frmAccountId:[null,Validators.required], toAccountId:[null,Validators.required], amount:[null,[Validators.required, Validators.min(1)]] });
  }
  ngOnInit(){ const uid = this.auth.currentUserId ?? 0; this.acc.byUser(uid).subscribe(a=>this.myAccounts=a); }
  submit(){
    this.msg=''; this.loading=true;
    const body = { ...(this.form.value as any), transactionType:'TRANSFER' };
    this.tx.create(body).subscribe({ next:()=>{ this.msg='Transfer successful'; this.loading=false; }, error:()=>{ this.msg='Transfer failed'; this.loading=false; } });
  }
}
