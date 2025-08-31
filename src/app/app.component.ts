import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './core/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public auth:AuthService, private r:Router){}
  logout(){ this.auth.logout(); this.r.navigateByUrl('/login'); }
}
