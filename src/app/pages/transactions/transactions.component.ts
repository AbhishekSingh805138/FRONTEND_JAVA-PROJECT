import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../api/transactions.service';
import { AuthService } from '../../core/auth.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector:'app-transactions',
  standalone: true,
  templateUrl:'./transactions.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    DecimalPipe,
    DatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class TransactionsComponent implements OnInit {
  rows:any[]=[]; displayedColumns=['id','date','from','to','amt','actions']; loading=true; error:string|undefined;
  creating=false;
  form!: ReturnType<FormBuilder['group']>;

  constructor(private tx:TransactionsService, private auth:AuthService, private fb:FormBuilder){
    this.form = this.fb.group({
      frmAccountId:[null, Validators.required],
      toAccountId:[null, Validators.required],
      amount:[null, [Validators.required, Validators.min(1)]],
      userId:[null, Validators.required]
    });
  }
  private load(){
    this.loading=true; this.error=undefined;
    this.tx.list().pipe(finalize(()=> this.loading=false)).subscribe({
      next: r => { this.rows = r; },
      error: e => { this.error = (e?.message)||'Failed to load transactions'; }
    });
  }
  ngOnInit(){
    this.load();
  }

  startCreate(){
    this.creating = true;
    this.form.reset();
    const uid = this.auth.currentUserId ?? null;
    if(uid){ this.form.patchValue({ userId: uid }); }
  }
  cancelCreate(){ this.creating = false; }
  submitCreate(){
    if(this.form.invalid) return;
    const v:any = this.form.value;
    const body = {
      frmAccountId: Number(v.frmAccountId),
      toAccountId: Number(v.toAccountId),
      amount: Number(v.amount),
      userId: Number(v.userId ?? this.auth.currentUserId),
      transactionType: 'TRANSFER' as const
    };
    this.tx.create(body).subscribe({
      next: () => { this.creating=false; this.form.reset(); this.load(); },
      error: (e) => { this.error = (e?.error?.message) || e?.message || 'Failed to create transaction'; }
    });
  }

  delete(row:any, ev?:Event) {
  ev?.stopPropagation();
  const id = row?.id;
  if (!id) return;

  this.loading = true;
  this.error = undefined;

  this.tx.delete(Number(id)).subscribe({
    next: () => this.load(),
    error: e => {
      this.error = (e?.error?.message) || e?.message || 'Failed to delete transaction';
      this.loading = false;
    }
  });
}

}
