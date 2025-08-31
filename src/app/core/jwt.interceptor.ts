import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokens: TokenService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const t = this.tokens.getToken();
    const cloned = t ? req.clone({ setHeaders: { Authorization: `Bearer ${t}` } }) : req;
    return next.handle(cloned);
  }
}
