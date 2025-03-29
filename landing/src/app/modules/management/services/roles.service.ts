import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
 import { Observable } from 'rxjs';
import { Role } from '../model/role';
import { BaseService } from 'src/app/_metronic/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BaseService<Role> {

  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'roles/');
  }

  updatePermissions(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'UpdatePermissions', model);
  }
}
