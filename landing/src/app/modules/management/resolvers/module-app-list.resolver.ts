import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { ModuleApp } from '../model/module-app';
import { ModuleAppService } from '../services/module-app.service';
import { BaseListResolver } from 'src/app/_metronic/resolvers/base-List.resolver';
import { AlertService } from 'src/app/_metronic/services/alter.service';
 @Injectable({
  providedIn: 'root',
})
export class ModuleAppListResolver extends BaseListResolver<ModuleApp> {
  constructor(
    router: Router,
    baseService:ModuleAppService,
    alertService: AlertService
  ) {
    super(router, baseService, alertService);
  }
}
