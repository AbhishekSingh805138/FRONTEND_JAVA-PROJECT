import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector:'app-login',
  templateUrl:'./login.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
      next: (res) => { this.auth.setToken(res.accessToken); this.r.navigateByUrl('/'); },
      error: () => { this.err='Invalid credentials'; this.loading=false; }
    });
  }
}

