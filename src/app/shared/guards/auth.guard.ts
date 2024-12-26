import {inject, Injectable} from '@angular/core';
import {Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "../../features/auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthFunctions {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    return this.authService.isLoggedIn.pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      })
    );
  };
}

export const authGuard: CanActivateFn = (route, state) =>
  inject(AuthFunctions).canActivate(route, state);
