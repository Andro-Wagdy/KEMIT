import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { ClaimApp } from '../model/claim-app';
import { ClaimAppService } from '../services/claim-app.service';
import { BaseListResolver } from 'src/app/_metronic/resolvers/base-List.resolver';
import { AlertService } from 'src/app/_metronic/services/alter.service';
 @Injectable({
  providedIn: 'root',
})
export class ClaimAppListResolver extends BaseListResolver<ClaimApp> {
  constructor(
    router: Router,
    baseService:ClaimAppService,
    alertService: AlertService
  ) {
    super(router, baseService, alertService);
  }
}
