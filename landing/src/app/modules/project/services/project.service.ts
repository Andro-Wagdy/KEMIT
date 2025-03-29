import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/_metronic/services/base-service';
import { Project } from '../models/project';
@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService<Project> {
  constructor(http: HttpClient) {
    super(http, environment.apiUrl + 'Project/');
  }
  getField(id:string) {
    return this.http.get(this.baseUrl + "getField/"+id);
  }
  deleteFiled(id: any) {
    return this.http.delete(this.baseUrl+'deleteFiled/' + id, this.httpOptions);
  }

}
