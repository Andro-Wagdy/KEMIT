 import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
 import { Observable, of } from 'rxjs';
import { AlertService } from 'src/app/_metronic/services/alter.service';
@Injectable({
  providedIn: 'root'
})
export class UserEditResolver  {
 constructor(
    private router: Router,
    private userService: UserService,
     private alertService: AlertService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.paramMap.get('id');
    if (id === '' || null) {
      this.alertService.error();
      this.router.navigateByUrl("/security/users");
      return of(null);
    }
    return this.userService.getById(id);

  };
}

