 import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { AlertService } from '../services/alter.service';



@Injectable({
  providedIn: 'root'
})
export class PrivatePermissionGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let roles = route.data["permission"] as Array<string>;
    if (this.authservice.permissionMatch(roles)) {
      return true;
    }
    this.alertService.error("general.message.notAllow")
    this.router.navigate(['/']);
    return false;

  }
}
