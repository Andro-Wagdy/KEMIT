import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { LanguageKey } from '../model/Language-key';
import { LanguageKeyService } from '../services/language-key.service';
import { BaseListResolver } from 'src/app/_metronic/resolvers/base-List.resolver';
import { AlertService } from 'src/app/_metronic/services/alter.service';
@Injectable({
  providedIn: 'root',
})
export class LanguageKeyListResolver extends BaseListResolver<LanguageKey> {
  constructor(
    router: Router,
    baseService:LanguageKeyService,
    alertService: AlertService
  ) {
    super(router, baseService, alertService);
  }
}
