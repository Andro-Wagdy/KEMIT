import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LanguageService } from 'src/app/modules/management/services/language.service';
import { DashboardSetting } from 'src/app/modules/setting/models/dashboard-setting';

@Injectable({
  providedIn: 'root',
})
export class ShardService {
  productList: any[] = [];
  public generalSetting: any;
  public dashboardSetting: DashboardSetting;

  public languges: any = [];
  public LangugesLocal: any;
  constructor(private languageService: LanguageService) {}

  getLanguages() {
    return this.languageService.getallList().subscribe((res: any) => {
      let langObj = localStorage.getItem('lang') || '';
      if (langObj.length <= 0) {
        let lang = res.find((e: any) => {
          e.isDefault == true;
        });
        //     localStorage.setItem('lang', JSON.stringify(lang) );
      }
      this.languges = res;
    });
  }
}
