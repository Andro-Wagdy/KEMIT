import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ScreenApp } from '../model/screen-app';
import { BaseService } from 'src/app/_metronic/services/base-service';
  @Injectable({
  providedIn: 'root'
})
export class ScreenAppService extends BaseService<ScreenApp> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'ScreenApp/');
  }
}
