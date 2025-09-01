import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UsersService, UserRes } from '../../api/users.service';

@Component({
  selector: 'app-user-new',
  standalone: true,
  templateUrl: './user-new.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule]
})
export class UserNewComponent implements OnInit {
  msg = '';
  loading = false;
  form!: ReturnType<FormBuilder['group']>;
  rows: UserRes[] = [];
  error: string | undefined;
  displayedColumns = ['userId','username','address'];

  constructor(private fb: FormBuilder, private users: UsersService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      address:  ['']
    });
  }

  ngOnInit(){
    this.load();
  }

  private load(){
    this.loading = true; this.error = undefined;
    this.users.list().subscribe({
      next: r => { this.rows = r; this.loading = false; },
      error: e => { this.error = e?.message || 'Failed to load users'; this.loading = false; }
    });
  }

  submit(){
    if(this.form.invalid) return;
    this.loading = true; this.msg = '';
    const body = this.form.getRawValue();
    this.users.create(body as any).subscribe({
      next: r => { this.msg = `User created with ID ${r.userId}`; this.form.reset(); this.loading=false; this.load(); },
      error: e => { this.msg = e?.error?.message || e?.message || 'Failed to create user'; this.loading=false; }
    });
  }
}
