
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardSettingService {
baseUrl: any=environment.apiUrl+"DashboardSetting/" ;
constructor(public http: HttpClient) {}
get() {
  return this.http.get(this.baseUrl);
}
getAffliateSettingInit() {
  return this.http.get(this.baseUrl+"DashboardSettingInit");
}
edit(model:any) {
  return this.http.post(this.baseUrl + "edit",model);
}


}

