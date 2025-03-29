import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
 import { Role } from '../model/role';
 import { RolesService } from '../services/roles.service';
import { PaginationResult } from 'src/app/_metronic/models/pagination ';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { BaseListResolver } from 'src/app/_metronic/resolvers/base-List.resolver';


@Injectable({
  providedIn: 'root'
})
export class RoleListResolver extends BaseListResolver<Role> {
  constructor(
    router: Router,
    baseService:RolesService,
    alertService: AlertService
  ) {
    super(router, baseService, alertService);
  }
}






