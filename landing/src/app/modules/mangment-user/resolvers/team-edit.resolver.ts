 import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
 import { Observable, of } from 'rxjs';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { UserTeamWorkService } from '../services/user-team-work.service';
@Injectable({
  providedIn: 'root'
})
export class TeamEditResolver  {
 constructor(
    private router: Router,
    private userService: UserTeamWorkService,
     private alertService: AlertService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.paramMap.get('id');
    if (id === '' || null) {
      this.alertService.error();
      this.router.navigateByUrl("/security");
      return of(null);
    }
    return this.userService.getById(id);

  };
}

