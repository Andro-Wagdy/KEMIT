import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../model/user';
import { BaseService } from 'src/app/_metronic/services/base-service';
import { PaginationResult } from 'src/app/_metronic/models/pagination ';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor(http: HttpClient, private authService: AuthService) {
    super(http, environment.apiUrl + 'UsersApp/');
  }
  getTeamWork(paginationParams?: any
  ): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();
    return this.http.post<User[]>(this.baseUrl, paginationParams, { observe: 'response' }).pipe(
      map((response: any) => {
        paginationResult.result = response.body || undefined;
        if (response.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination') || '');
        }
        return paginationResult;
      })
    );

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


  getUsersAnalysis() {
    return this.http.get(this.baseUrl + 'GetUsersAnalysis');
  }
  getAllHospitalList() {
    return this.http.get(this.baseUrl + 'GetAllHospitalList');
  }
  getAllDoctors() {
    return this.http.get(this.baseUrl + 'getAllDoctors');
  }
  changeCurrentTime(date:any){
    return this.http.post(this.baseUrl + 'changeCurrentTime',{date:date});
  }
}
