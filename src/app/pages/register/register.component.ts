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
  selector:'app-register',
  templateUrl:'./register.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RegisterComponent {
  form!: ReturnType<FormBuilder['group']>;
  loading=false; msg='';
  constructor(private fb:FormBuilder, private auth:AuthService, private r:Router){
    this.form = this.fb.group({ username:['',[Validators.required, Validators.email]], password:['',Validators.required], address:[''] });
  }
  submit(){
    this.msg=''; this.loading=true;
    this.auth.register(this.form.value as any).subscribe({
      next: () => { this.msg='Registered! Please login.'; this.r.navigateByUrl('/login'); },
      error: () => { this.msg='Registration failed'; this.loading=false; }
    });
  }
}

