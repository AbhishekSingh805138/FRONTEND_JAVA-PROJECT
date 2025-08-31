// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { LoginReq, LoginRes } from '../shared/models';
// import { currentUserIdFromToken } from './jwt.util';
// import { TokenService } from './token.service';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   constructor(private http: HttpClient, private tokens: TokenService) {}

//   login(body: LoginReq){
//     return this.http.post<LoginRes>(`${environment.authBase}/login`, body);
//   }
//   register(body: { username: string; password: string; address?: string }){
//     return this.http.post(`${environment.authBase}/register`, body);
//   }
//   setToken(t: string){ this.tokens.setToken(t); }
//   get token(){ return this.tokens.getToken(); }
//   logout(){ this.tokens.clear(); }
//   get isAuthed(){ return !!this.token; }
//   get currentUserId(){ return currentUserIdFromToken(this.token); }
// }
// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginReq, LoginRes } from '../shared/models';
import { currentUserIdFromToken } from './jwt.util';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private tokens: TokenService) {}

  login(body: LoginReq){
    // Some backends expect `email` instead of `username`; send both to be safe
    const payload = { ...body, email: (body as any).username ?? (body as any).email } as any;
    // Server returns plain text like: "Bearer <jwt>"
    return this.http.post(`${environment.authBase}/login`, payload, { responseType: 'text' as const });
  }

  // 👇 add responseType 'text' because server returns plain text
  register(body: { username: string; password: string; address?: string }){
    return this.http.post(
      `${environment.authBase}/register`,
      body,
      { responseType: 'text' as const }
    );
  }

  setToken(t: string){ this.tokens.setToken(t); }
  get token(){ return this.tokens.getToken(); }
  logout(){ this.tokens.clear(); }
  get isAuthed(){ return !!this.token; }
  get currentUserId(){ return currentUserIdFromToken(this.token); }
}
