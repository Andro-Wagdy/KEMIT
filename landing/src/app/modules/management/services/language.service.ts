import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
import { Language } from '../model/language';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/_metronic/services/base-service';
 @Injectable({
  providedIn: 'root'
})
export class LanguageService extends BaseService<Language> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'Language/');
  }
  SetDefault(id: string): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'SetAsDefault/' + id, {});
  }
  getActive(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'ActiveLanguage');
  }
}
