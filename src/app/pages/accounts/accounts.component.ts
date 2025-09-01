import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../api/accounts.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector:'app-accounts',
  standalone: true,
  templateUrl:'./accounts.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    DecimalPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AccountsComponent implements OnInit {
  rows:any[]=[]; loading=true; displayedColumns=['id','type','bal']; error:string|undefined;
  creating=false;
  form!: ReturnType<FormBuilder['group']>;

  constructor(private svc:AccountsService, private auth:AuthService, private r:Router, private fb:FormBuilder){
    this.form = this.fb.group({
      accountType:['SAVINGS', Validators.required],
      accountBalance:[null, [Validators.required, Validators.min(0)]],
      userId:[null, Validators.required],
      secretPassword:['', Validators.required]
    });
  }
  ngOnInit(){
    // Show all accounts from 8082 (backend has no per-user endpoint matching our token sometimes)
    this.svc.list().subscribe({
      next: r=>{ this.rows=r; this.loading=false; },
      error: e=>{ this.error = (e?.message)||'Failed to load accounts'; this.loading=false; }
    });
  }
  open(row:any){ this.r.navigate(['/accounts', row.id]); }

  startCreate(){
    this.creating = true; this.form.reset();
    this.form.patchValue({ accountType:'SAVINGS' });
    const uid = this.auth.currentUserId ?? null;
    if(uid) this.form.patchValue({ userId: uid });
  }
  cancelCreate(){ this.creating=false; }
  submitCreate(){
    if(this.form.invalid) return;
    const v:any = this.form.value;
    const payload = {
      accountType: String(v.accountType),
      accountBalance: Number(v.accountBalance),
      userId: Number(v.userId),
      secretPassword: String(v.secretPassword)
    };
    this.svc.create(payload as any).subscribe({
      next: ()=>{ this.creating=false; this.form.reset(); this.reload(); },
      error: e=>{ this.error = (e?.error?.message)||e?.message||'Failed to create account'; }
    });
  }
  private reload(){
    this.loading=true; this.error=undefined;
    this.svc.list().subscribe({ next:r=>{ this.rows=r; this.loading=false; }, error:e=>{ this.error=e?.message||'Failed to load accounts'; this.loading=false; } });
  }
}
