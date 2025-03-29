import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LanguageKey } from '../model/Language-key';
import { BaseService } from 'src/app/_metronic/services/base-service';
 @Injectable({
  providedIn: 'root'
})
export class LanguageKeyService extends BaseService<LanguageKey> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'LanguageKey/');
  }

  getByLangId(id: any) {
    return this.http.get(this.baseUrl + id+"/texts");
  }

}
