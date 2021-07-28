import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';

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

    return next.handle(request).pipe(
      catchError( (err, original): Observable<HttpEvent<unknown>> => {
        if (err.status === 401) {
          this.auth.logout();
        }
        return original;
      })
    );
  }
}
