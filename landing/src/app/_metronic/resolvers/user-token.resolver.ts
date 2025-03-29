import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
  import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
 import { ShardService } from '../services/shard.service';
import { DashboardSettingService } from 'src/app/modules/setting/services/dashboard-setting.service';
  @Injectable({
  providedIn: 'root'
})
export class UserTokenResolver implements Resolve<any> {
 constructor(
    private router: Router,
    private authService: AuthService,
    private affilateSettingService: DashboardSettingService,
    private shardService:ShardService,

     private alertService: AlertService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let token= this.authService.getToken();

    return forkJoin([token]);
  };
}

