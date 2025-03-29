import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LanguageText } from '../model/language-text';
import { BaseService } from 'src/app/_metronic/services/base-service';
 @Injectable({
  providedIn: 'root'
})
export class LanguageTextService extends BaseService<LanguageText> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'LanguageText/');
  }
    moreParams(params:HttpParams,paginationParams:any){
    params = params.append('targetValue', paginationParams.targetValue || ' ');
    params = params.append('languageId', paginationParams.languageId ||'');
    params = params.append('languageKeyId', paginationParams.languageKeyId || '');
    params = params.append('screenId', paginationParams.screenId || '');
      return params;
 }

  updateToLanguage() {
    return this.http.get(this.baseUrl + "UpdateToLanguage");
  }
  getLanguageForLocal(lang:string) {
    return this.http.get(this.baseUrl + "LanguageForLocal?lang="+lang);
  }
  getLanguageDefault(lang:string) {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
 }
