// import { Component } from '@angular/core';
// import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../core/auth.service';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector:'app-register',
//   standalone: true,
//   templateUrl:'./register.component.html',
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     RouterLink,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatButtonModule
//   ]
// })
// export class RegisterComponent {
//   form!: ReturnType<FormBuilder['group']>;
//   loading=false; msg='';
//   constructor(private fb:FormBuilder, private auth:AuthService, private r:Router){
//     this.form = this.fb.group({ username:['',[Validators.required, Validators.email]], password:['',Validators.required], address:[''] });
//   }
//   submit(){
//     this.msg=''; this.loading=true;
//     const creds = this.form.value as { username: string; password: string; address?: string };
//     this.auth.register(creds).subscribe({
//       next: () => { this.msg='Registered! Please login.'; this.r.navigateByUrl('/login'); },
//       error: () => { this.msg='Registration failed'; this.loading=false; }
//     });
//   }
// }
// src/app/pages/register/register.component.ts (paths per your project)
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
  selector:'app-register',
  standalone: true,
  templateUrl:'./register.component.html',
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ]
})
export class RegisterComponent {
  form!: ReturnType<FormBuilder['group']>;
  loading=false; msg='';

  constructor(private fb:FormBuilder, private auth:AuthService, private r:Router){
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['']
    });
  }

  submit(){
    if (this.form.invalid) return;
    this.msg=''; this.loading=true;
    const creds = this.form.value as { username: string; password: string; address?: string };

    this.auth.register(creds).subscribe({
      next: (resText) => {
        this.msg = resText || 'Registered! Please login.';
        this.r.navigateByUrl('/login');        // ✅ redirect after success
      },
      error: (err) => {
        this.msg = (err?.error?.message || err?.error || 'Registration failed');
        this.loading=false;
      }
    });
  }
}
