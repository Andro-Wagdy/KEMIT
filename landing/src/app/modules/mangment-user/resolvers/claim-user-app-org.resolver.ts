import { Injectable } from '@angular/core';
 import { ActivatedRouteSnapshot, Router } from '@angular/router';
 import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { ClaimAppService } from '../../management/services/claim-app.service';
 @Injectable({
  providedIn: 'root',
})
export class ClaimUserAppOrgResolver {
  constructor(
  private  router: Router,
  private  baseService:ClaimAppService,
  private alertService: AlertService
  ) {
   }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
   let roleId= route.paramMap.get('id');
      return this.baseService.GetUserClaimsForRoleOrg(roleId).pipe(
      catchError(error => {
        this.router.navigate(['/security']);
        this.alertService.error();
        return of(null);
      })
    )
  };
}
