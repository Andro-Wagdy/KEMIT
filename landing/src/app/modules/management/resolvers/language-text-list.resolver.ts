import { Injectable } from '@angular/core';
 import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LanguageTextService } from '../services/language-text.service';
import { AlertService } from 'src/app/_metronic/services/alter.service';
@Injectable({
  providedIn: 'root',
})
export class LanguageTextListResolver  implements Resolve<any>{
  pagination:any=
  {
    pageNumber:1,
    pageSize:10,

  };
  constructor(
  private  router: Router,
  private  baseService:LanguageTextService,
  private alertService: AlertService
  ) {
   }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
   this.pagination.languageId = route.paramMap.get('id');
     return this.baseService.get(this.pagination).pipe(
      catchError(error => {
        this.router.navigate(['']);
        this.alertService.error();
        return of(null);
      })
    )
  };
}
