import { InjectionToken, Provider } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../model/user";
import { UserService } from "../service/user.service";
import { switchMap } from 'rxjs/operators';

// Factory.
const userFactory = (
  ar: ActivatedRoute,
  userService: UserService,
): Observable<User> => {
  return ar.params.pipe(
    switchMap( params => userService.get(params.id) )
  );
};

// Token.
export const USER_INFO = new InjectionToken<Observable<User>>(
  'A stream for get user information.'
);

// Provider.
export const USER_PROVIDER: Provider[] = [
  {
    provide: USER_INFO,
    deps: [ActivatedRoute, UserService],
    useFactory: userFactory
  }
];
