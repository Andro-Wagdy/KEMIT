import { Injectable } from '@angular/core';
 import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClaimApp } from '../model/claim-app';
import { BaseService } from 'src/app/_metronic/services/base-service';
 @Injectable({
  providedIn: 'root'
})
export class ClaimAppService extends BaseService<ClaimApp> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'ClaimApp/');
  }

  GetClaimsOrg(roleId:any) {
    return this.http.get(this.baseUrl+"GetClaimsOrg?roleId="+roleId);
  }
  GetUserClaimsForRoleOrg(id:any) {
    return this.http.get(this.baseUrl+"GetUserClaimsForRoleOrg/"+id);
  }
}
