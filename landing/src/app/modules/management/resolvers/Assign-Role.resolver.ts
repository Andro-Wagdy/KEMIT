import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RolesService } from '../services/roles.service';
import { UserService } from '../services/user.service';
import { AlertService } from 'src/app/_metronic/services/alter.service';
@Injectable({
  providedIn: 'root'
})
export class AssignRoleResolver implements Resolve<any> {
  pagination:any=
  {
    pageNumber:1,
    pageSize:10
  };
  constructor(
    private router: Router,
    private roleService: RolesService,
    private userService: UserService,
    private alertService: AlertService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.paramMap.get('id');
    if (id === ' ' || null) {
      this.alertService.error('id empty');
      this.router.navigateByUrl("security")
    }
    return forkJoin([
      this.roleService.get(this.pagination),
      this.userService.getRoleUser(id)
    ]).pipe(
      map(result => {
        return {
          roles: result[0],
          userRole: result[1]
        };
      }));
  };
}
