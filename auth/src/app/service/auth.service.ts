import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { ConfigService } from './config.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userObjectName: string = 'currentUser';
  private currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject$.asObservable();
  get currentUserValue(): User | null {
    return this.currentUserSubject$.getValue();
  }
  lastToken: string = '';
  loginUrl: string = `${this.config.apiUrl}login`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private config: ConfigService,
  ) {
    const localUser = localStorage.getItem(this.userObjectName);
    if (localUser) {
      const user: User = JSON.parse(localUser);
      this.currentUserSubject$.next(user);
      this.lastToken = user.token || '';
    }
  }

  login(loginData: User): Observable<User | null> {
    return this.http.post<{ accessToken: string }>(this.loginUrl, loginData).pipe(
      switchMap(response => {
        if (response.accessToken) {
          this.lastToken = response.accessToken;
          return this.userService.query(`email=${loginData.email}`);
        }
        return of(null);
      }),
      map(user => user ? user[0] : null),
      tap(user => {
        if (user) {
          user.token = this.lastToken;
          this.currentUserSubject$.next(user);
          localStorage.setItem(this.userObjectName, JSON.stringify(user));
        } else {
          localStorage.removeItem(this.userObjectName);
          this.currentUserSubject$.next(null);
          this.lastToken = '';
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem(this.userObjectName);
    this.currentUserSubject$.next(null);
    this.lastToken = '';
    this.router.navigate(['login']);
  }
}
