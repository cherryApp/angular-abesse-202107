import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.auth.currentUserValue;
      if (route.data?.role && user && user.role) {
        if (user.role >= route.data.role) {
          return true;
        }
      }

      this.router.navigate(['forbidden']);
      return false;
  }

  canLoad(
    route: Route,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.auth.currentUserValue;
      if (route.data?.role && user && user.role) {
        if (user.role >= route.data.role) {
          return true;
        }
      }

      return false;
  }

}
