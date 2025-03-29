import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { ScreenApp } from '../model/screen-app';
import { ScreenAppService } from '../services/screen-app.service';
import { BaseListResolver } from 'src/app/_metronic/resolvers/base-List.resolver';
import { AlertService } from 'src/app/_metronic/services/alter.service';
@Injectable({
  providedIn: 'root',
})
export class ScreenAppListResolver extends BaseListResolver<ScreenApp> {
  constructor(
    router: Router,
    baseService: ScreenAppService,
    alertService: AlertService
  ) {
    super(router, baseService, alertService);
  }
}
