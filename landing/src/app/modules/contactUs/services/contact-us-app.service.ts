
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/_metronic/services/base-service';
import { environment } from 'src/environments/environment';
import { ContactUsApp } from '../models/contact-us-app';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactUsAppService extends BaseService<ContactUsApp> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'ContactUsApp/');
  }
  registerLanding(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', model);
  }
}


