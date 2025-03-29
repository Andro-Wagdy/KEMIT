import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor(
    private authservice: AuthService,
    private router:Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (this.authservice.loggedIn()) {
        return true;
      }
      this.router.navigate(['/auth']);
      return false;
  }
}
