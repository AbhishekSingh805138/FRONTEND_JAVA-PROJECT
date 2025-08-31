import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private a:AuthService, private r:Router){}
  canActivate(){ if(this.a.isAuthed) return true; this.r.navigate(['/login']); return false; }
}

