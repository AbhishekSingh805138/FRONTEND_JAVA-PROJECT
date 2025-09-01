import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface UserCreateReq {
  username: string;
  password: string;
  address?: string;
}

export interface UserRes {
  userId: number;
  username: string;
  address?: string | null;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  base = `${environment.usersBase}`; // http://localhost:8081/users
  constructor(private http: HttpClient) {}

  create(body: UserCreateReq) {
    return this.http.post<UserRes>(this.base, body, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
    });
  }
}

