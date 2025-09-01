import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokens: TokenService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const t = this.tokens.getToken();
    // Skip attaching Authorization to the transactions backend (8083) unless needed
    const isTxApi = req.url.startsWith(environment.transactionsBase);
    const cloned = t && !isTxApi ? req.clone({ setHeaders: { Authorization: `Bearer ${t}` } }) : req;
    return next.handle(cloned);
  }
}
