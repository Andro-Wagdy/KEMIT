import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationResult } from '../models/pagination ';
import { AlertService } from '../services/alter.service';
import { BaseService } from '../services/base-service';

export class BaseListResolver<T> implements Resolve<PaginationResult<T[]> | null> {
 pagination:any=
 {
   pageNumber:1,
   pageSize:10
 };
constructor(
     protected router: Router,
     protected BaseService: BaseService<T>,
     protected alertService: AlertService,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationResult<T[]> | null> {

     return this.BaseService.get(this.pagination).pipe(
        catchError(error => {
         console.log(error)
           this.router.navigate(['']);
            this.alertService.error(error);
           return of(null);
        })
     )
  };
}
