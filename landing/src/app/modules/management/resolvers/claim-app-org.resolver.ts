import { Injectable } from '@angular/core';
 import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ClaimAppService } from '../services/claim-app.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from 'src/app/_metronic/services/alter.service';
 @Injectable({
  providedIn: 'root',
})
export class ClaimAppOrgResolver {
  constructor(
  private  router: Router,
  private  baseService:ClaimAppService,
  private alertService: AlertService
  ) {
   }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
   let roleId= route.paramMap.get('id');

      return this.baseService.GetClaimsOrg(roleId).pipe(
      catchError(error => {
        this.router.navigate(['/management/roles']);
        this.alertService.error();
        return of(null);
      })
    )
  };
}
