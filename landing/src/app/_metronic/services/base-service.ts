import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, pipe } from "rxjs";
import { map } from "rxjs/operators";
import { PaginationResult } from "../models/pagination ";

export class BaseService<T> {
  baseUrl: any
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(public http: HttpClient, baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  // get all users list from api
  get(  paginationParams?: any
  ): Observable<PaginationResult<T[]>> {
      const paginationResult: PaginationResult<T[]> = new PaginationResult<T[]>();
     return this.http.post<T[]>(this.baseUrl,paginationParams,{ observe: 'response'}).pipe(
      map((response:any) => {
        paginationResult.result = response.body || undefined;
         if (response.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination') || '');
         }
        return paginationResult;
      })
    );

  }
    moreParams(params:HttpParams,paginationParams:any){
    return params;

  }
  // check lab code found  from api

  getAll() {
    return this.http.get(this.baseUrl + "getall");
  }


  getById(id: any) {
    return this.http.get(this.baseUrl + id);
  }
  register(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', model);
  }

  edit(id: string, model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Edit/' + id, model);
  }


  delete(id: any) {
    return this.http.delete(this.baseUrl + id, this.httpOptions);
  }
  deleteRange(model: any) {
    return this.http.post(this.baseUrl + 'deleterange', model, this.httpOptions);
  }


  getallList() {
    return this.http.get(this.baseUrl + "getallList");
  }


}
