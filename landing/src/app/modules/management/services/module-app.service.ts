import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ModuleApp } from '../model/module-app';
import { BaseService } from 'src/app/_metronic/services/base-service';
 @Injectable({
  providedIn: 'root'
})
export class ModuleAppService extends BaseService<ModuleApp> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'ModuleApp/');
  }
}
