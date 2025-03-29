import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
 import { AuditApp } from '../model/audit-app';
import { BaseService } from 'src/app/_metronic/services/base-service';
 @Injectable({
  providedIn: 'root'
})
export class AuditAppService extends BaseService<AuditApp> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'AuditApp/');
  }
  getTableName() {
    return this.http.get(this.baseUrl + "GetTableName");
  }
  getState() {
    return this.http.get(this.baseUrl + "GetState");
  }
  getLevel() {
    return this.http.get(this.baseUrl + "GetLevel");
  }
}
