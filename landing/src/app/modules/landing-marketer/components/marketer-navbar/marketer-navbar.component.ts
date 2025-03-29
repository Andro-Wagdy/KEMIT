import { Component, OnInit } from "@angular/core";
import { LanguageChangeService } from "src/app/_metronic/services/language-change.service";
import { ShardService } from "src/app/_metronic/services/shard.service";
import { DashboardSetting } from "src/app/modules/setting/models/dashboard-setting";
import { environment } from "src/environments/environment";


@Component({
  selector: 'marketer-navbar',
  templateUrl: './marketer-navbar.component.html',
  styleUrls: ['./marketer-navbar.component.scss']
})
export class MarketerNavbarComponent implements OnInit {
  languages:any=[];
  selectedLang:any={};
  dashboardSetting?:DashboardSetting;
  serverPath=environment.dashboardSettingMedia;
  constructor(
    private sharedService:ShardService,
    private languageChangeService:LanguageChangeService,
  ) {

  }
  ngOnInit(): void {
    this.dashboardSetting=this.sharedService.dashboardSetting;

    this.languages=this.sharedService.languges;
   let langS= localStorage.getItem("lang");
   if(langS)
   this.selectedLang=JSON.parse(langS);

  }
    switchMode(lang:any){
      this.selectedLang=lang;
      this.languageChangeService.changeLanguae(lang);

    }

}
