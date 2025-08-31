import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginReq, LoginRes } from '../shared/models';
import { currentUserIdFromToken } from './jwt.util';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'access_token';
  constructor(private http: HttpClient) {}

  login(body: LoginReq){
    return this.http.post<LoginRes>(`${environment.apiBase}/auth/login`, body);
  }
  register(body: { username: string; password: string; address?: string }){
    return this.http.post(`${environment.apiBase}/auth/register`, body);
  }
  setToken(t: string){ localStorage.setItem(this.tokenKey, t); }
  get token(){ return localStorage.getItem(this.tokenKey); }
  logout(){ localStorage.removeItem(this.tokenKey); }
  get isAuthed(){ return !!this.token; }
  get currentUserId(){ return currentUserIdFromToken(this.token); }
}

