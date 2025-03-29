import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageChangeService } from 'src/app/_metronic/services/language-change.service';
import { LanguageDBLoaderService } from 'src/app/_metronic/services/language-dbloader.service';
import { ShardService } from 'src/app/_metronic/services/shard.service';
import { DashboardSetting } from '../setting/models/dashboard-setting';
import { environment } from 'src/environments/environment';

// const BODY_CLASSES = ['bgi-size-cover', 'bgi-position-center', 'bgi-no-repeat'];

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '<body[root]>',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  languges:any=[];
  icon:string='us';
  dashboardSetting?:DashboardSetting;
  serverPath=environment.dashboardSettingMedia;
  constructor(
    private shardService:ShardService ,
    private languageChangeService:LanguageChangeService ) {}

  ngOnInit(): void {
this.dashboardSetting=this.shardService.dashboardSetting;

   this.languges=this.shardService.languges;
   let lang=this.shardService.languges.filter((e:any)=>{e.isDefault==true})[0];
   this.icon=lang?  lang.icon: this.icon;

  }

  onLanguageSelected(select:any){
    let lang=JSON.parse( select.target.value);
    this.icon=lang?  lang.icon: this.icon;
    this.languageChangeService.changeLanguae(lang);
}
  ngOnDestroy() {
    // BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
  }
}
