import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientBackendService } from 'angular-in-memory-web-api';
import { catchError, forkJoin, map, of } from 'rxjs';
import { LanguageTextService } from 'src/app/modules/management/services/language-text.service';
import { environment } from 'src/environments/environment';
import { ShardService } from './shard.service';
import { LanguageService } from 'src/app/modules/management/services/language.service';
import { LanguageChangeService } from './language-change.service';
import { AuthService } from 'src/app/modules/auth';
import { DashboardSettingService } from 'src/app/modules/setting/services/dashboard-setting.service';
import { DashboardSetting } from 'src/app/modules/setting/models/dashboard-setting';
@Injectable()
export class AppInitService {
    isLocalInside=environment.isLocalInside;
    dashboardSettingMedia=environment.dashboardSettingMedia;
  constructor(
    private http: HttpClient,
    private languageTextService: LanguageTextService,
    private router: Router,
    private shardService: ShardService,
    private languageService: LanguageService,
    private languageChangeService: LanguageChangeService,
    private authService: AuthService,
    private affilateSettingService: DashboardSettingService,

  ) {  }

  Init() {
    let local:any;
    let lang: any = localStorage.getItem('lang');
    let name = environment.defaultLanguage.name;
    let langS:any=null;
    if (lang!==null) {
       langS = JSON.parse(lang);
         name = langS['name'];
    }
    if(this.isLocalInside){
      local = this.http.get(`../assets/localization/${name}.json`).pipe(
        map((res: any) => { this.shardService.LangugesLocal = res;}),
        catchError(
          (_) => { this.router.navigateByUrl("/error/init"); return of(null) }
        )
      )
    }
    else{
    local = this.languageTextService.getLanguageForLocal(name).pipe(
      map((res: any) => { this.shardService.LangugesLocal = res;}),
      catchError(
        (_) => { this.router.navigateByUrl("/error/init"); return of(null) }
      )
    )
      }
    let languages = this.languageService.getallList().pipe(
      map((res: any) => {
        if (langS==null) {
          let defaultLanguage = res.find((option: any) => option.isDefault === true);
          langS = defaultLanguage;
           }
         this.languageChangeService.changeLanguae(langS);
        this.shardService.languges = res
      }
      ));
      let affilateSetting = this.affilateSettingService.getAffliateSettingInit().pipe(
        map((res: any) => {
           this.shardService.dashboardSetting = res;
           if(res){
           let  r = document.querySelector(':root')! as any;
           if(res.bsPrimary){
           r.style.setProperty('--bs-primary', res.bsPrimary,"important");
            r.style.setProperty('--bs-text-primary', res.bsPrimary,"important");
            r.style.setProperty('--bs-primary-active', res.bsPrimary,"important");
           }
           if(res.bsSecondPrimary)
           r.style.setProperty('--bs-second-primary', res.bsSecondPrimary,"important");
           if(res.bsPrimaryInverse)
           r.style.setProperty('--bs-primary-inverse', res.bsPrimaryInverse,"important");
           if(res.landingPrimary)
           r.style.setProperty('--landing-main', res.landingPrimary,"important");
           if(res.landingSecondPrimary)
           r.style.setProperty('--landing-secondary', res.landingSecondPrimary,"important");
          this.setTags(res);
           }
         }
           ),
        catchError(
          (_) => { this.router.navigateByUrl("/error/init"); return of(null) }
        )
      )

    return forkJoin<any>([languages, local,affilateSetting]);
  }

  setTags(dashboardSetting:DashboardSetting){
      let  favicon:any = document.getElementById('favicon') || document.createElement('link');
      favicon.type = 'image/svg+xml';
      favicon.rel = 'shortcut icon';
      favicon.id = 'favicon';
      favicon.href =this.dashboardSettingMedia+ dashboardSetting.smallLogoPath;
      var head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(favicon);
    if(dashboardSetting.pageTitle){
      document.title = dashboardSetting.pageTitle;
    }
    if(dashboardSetting.pageDescription){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      metaTag.setAttribute('content',dashboardSetting.pageDescription);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.robots){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'robots');
      metaTag.setAttribute('content',dashboardSetting.robots);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.canonical){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'canonical');
      metaTag.setAttribute('content',dashboardSetting.canonical);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.ogLocale){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'ogLocale');
      metaTag.setAttribute('content',dashboardSetting.ogLocale);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.canonical){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'canonical');
      metaTag.setAttribute('content',dashboardSetting.canonical);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.ogSiteName){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'ogSiteName');
      metaTag.setAttribute('content',dashboardSetting.ogSiteName);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.canonical){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'canonical');
      metaTag.setAttribute('content',dashboardSetting.canonical);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.ogLocale){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'og:locale');
      metaTag.setAttribute('content',dashboardSetting.ogLocale);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.ogSiteName){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'og:site_name');
      metaTag.setAttribute('content',dashboardSetting.ogSiteName);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.ogType){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'og:type');
      metaTag.setAttribute('content',dashboardSetting.ogType);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.ogTitle){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'og:title');
      metaTag.setAttribute('content',dashboardSetting.ogTitle);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.ogDescription){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'og:description');
      metaTag.setAttribute('content',dashboardSetting.ogDescription);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.ogUrl){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'og:url');
      metaTag.setAttribute('content',dashboardSetting.ogUrl);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.twitterCard){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'twitter:card');
      metaTag.setAttribute('content',dashboardSetting.twitterCard);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.twitterTitle){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'twitter:title');
      metaTag.setAttribute('content',dashboardSetting.twitterTitle);
      document.head.appendChild(metaTag);
    }
    if(dashboardSetting.twitterDescription){
      var metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'twitter:description');
      metaTag.setAttribute('content',dashboardSetting.twitterDescription);
      document.head.appendChild(metaTag);
    }


  }

}
