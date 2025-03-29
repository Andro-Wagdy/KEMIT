import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
 import { Language } from '../model/language';
import { BaseListResolver } from 'src/app/_metronic/resolvers/base-List.resolver';
import { AlertService } from 'src/app/_metronic/services/alter.service';
@Injectable({
  providedIn: 'root',
})
export class LanguageListResolver extends BaseListResolver<Language> {
  constructor(
    router: Router,
    baseService:LanguageService,
    alertService: AlertService
  ) {
    super(router, baseService, alertService);
  }
}
