import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector:'app-login',
  standalone: true,
  templateUrl:'./login.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginComponent {
  form!: ReturnType<FormBuilder['group']>;
  loading=false; err='';
  constructor(private fb:FormBuilder, private auth:AuthService, private r:Router){
    this.form = this.fb.group({ username:['',[Validators.required, Validators.email]], password:['',Validators.required] });
  }
  submit(){
    this.err=''; this.loading=true;
    this.auth.login(this.form.value as any).subscribe({
      next: (res: any) => {
        // Handle either plain text ("Bearer <jwt>") or JSON token shapes
        let token: string | undefined;
        if (typeof res === 'string') {
          token = res.startsWith('Bearer ') ? res.slice(7).trim() : res.trim();
        } else {
          token = res?.accessToken ?? res?.access_token ?? res?.token ?? res?.jwt ?? res?.id_token;
        }
        if(!token){ this.err = 'Login succeeded, token missing.'; this.loading=false; return; }
        this.auth.setToken(String(token));
        this.r.navigateByUrl('/dashboard');
      },
      error: (e) => { this.err=(e?.error?.message)||'Invalid credentials'; this.loading=false; }
    });
  }
}
