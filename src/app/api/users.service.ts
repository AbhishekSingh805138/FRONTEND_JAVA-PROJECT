import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, UserUpdate } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  base = `${environment.apiBase}/users`;
  constructor(private http: HttpClient) {}
  list(){ return this.http.get<User[]>(this.base); }
  get(id:number){ return this.http.get<User>(`${this.base}/${id}`); }
  create(u: Partial<User>){ return this.http.post<User>(this.base, u); }
  update(id:number, u: UserUpdate){ return this.http.put<User>(`${this.base}/${id}`, u); }
  delete(id:number){ return this.http.delete(`${this.base}/${id}`); }
}

