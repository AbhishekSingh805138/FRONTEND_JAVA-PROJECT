import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private tokenKey = 'access_token';
  getToken(){ return localStorage.getItem(this.tokenKey); }
  setToken(t:string){ localStorage.setItem(this.tokenKey, t); }
  clear(){ localStorage.removeItem(this.tokenKey); }
}

