import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { LanguageService } from './modules/management/services/language.service';
import { LanguageDBLoaderService } from './_metronic/services/language-dbloader.service';
import { Router } from '@angular/router';
import { AppInitService } from './_metronic/services/appInit.service';
import { LanguageTextService } from './modules/management/services/language-text.service';
import { ShardService } from './_metronic/services/shard.service';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptorProvidor } from './_metronic/interceptors/error.interceptor';
import { LanguageInterceptorProvidor } from './_metronic/interceptors/language.interceptor';
import { LanguageChangeService } from './_metronic/services/language-change.service';
import { JwtModule } from '@auth0/angular-jwt';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DashboardSettingService } from './modules/setting/services/dashboard-setting.service';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#004b93',
  bgsOpacity: 0.9,
  bgsPosition: 'center-center',
  bgsSize: 0,
  bgsType: 'ball-spin-clockwise',
  blur: 10,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#004b93',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'ball-spin-clockwise',
  gap: 0,
  logoPosition: 'center-center',
  logoSize: 50,
  logoUrl: '',
  overlayBorderRadius: '0',
  overlayColor: 'rgb(255 255 255 / 40%)',
  pbColor: '#004b93',
  pbDirection: 'rtl',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '',
  textPosition: 'center-center',
  maxTime: 1,
  minTime: 1,
};
export function getToken() {
  return localStorage.getItem('token');
}
export function initializeApp1(appInitService: AppInitService) {
  return (): any => {
    return appInitService.Init();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      //  Translate moduale
      defaultLanguage: 'us',
      loader: {
        provide: TranslateLoader,
        useClass: LanguageDBLoaderService,
      },
    }),
    HttpClientModule,
    ClipboardModule,
    JwtModule.forRoot({
      // jwt module
      config: {
        tokenGetter: getToken,
        skipWhenExpired: false,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      },
    }),
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(
      // toaster module
      {
        preventDuplicates: false,
        maxOpened: 1,
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-center',
      }
    ),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    LanguageService,
    AppInitService,
    Router,
    ShardService,
    TranslateService,
    LanguageChangeService,
    DashboardSettingService,

    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      deps: [
        AppInitService,
        LanguageTextService,
        Router,
        ShardService,
        TranslateService,
        LanguageChangeService,
        DashboardSettingService,
      ],
      multi: true,
    },
    LanguageInterceptorProvidor,
    ErrorInterceptorProvidor,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
