import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.auth.lastToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.lastToken}`
        }
      });
    }

    return next.handle(request);
  }
}
