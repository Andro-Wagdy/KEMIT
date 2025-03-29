

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
  import { map } from 'rxjs/operators';
import { BaseService } from 'src/app/_metronic/services/base-service';
import { PaginationResult } from 'src/app/_metronic/models/pagination ';
import { AuthService } from '../../management/services/auth.service';
import { User } from '../../management/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserTeamWorkService extends BaseService<User> {
   constructor(http: HttpClient, private authService: AuthService) {
    super(http, environment.apiUrl + 'UserTeamWork/');
  }


  changePassword(id: string, model: any): Observable<any> {

    return this.http.post<any>(this.baseUrl + 'changepassword/' + id, model);
  }
  getRoleUser(id: any) {
    return this.http.get(this.baseUrl + 'rolesuser/' + id);
  }
  assignRoles(id: string, model: any) {
    return this.http.post<any>(this.baseUrl + 'assignroles/' + id, model, this.httpOptions);
  }

  addFavourite(id: string) {
    return this.http.post<any>(this.baseUrl + this.authService.decodedToken?.nameid + '/toggleuserfavourite/' + id, {}, this.httpOptions);
  }


  getUsersAnalysis(){
    return this.http.get(this.baseUrl + 'GetUsersAnalysis');

  }
  updatePermissions(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'UpdatePermissions', model);
  }
}
