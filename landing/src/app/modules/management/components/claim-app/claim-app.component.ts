

import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
 import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { ModuleApp } from '../../model/module-app';
import { ModuleAppService } from '../../services/module-app.service';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { ClaimApp } from '../../model/claim-app';
import { ClaimAppService } from '../../services/claim-app.service';
import { UISettingService } from 'src/app/_metronic/services/ui-setting.service';
import { ScreenAppService } from '../../services/screen-app.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-claim-app',
  templateUrl: './claim-app.component.html',
  styleUrls: ['./claim-app.component.scss']
})
export class ClaimAppComponent   extends  BaseComponent<ClaimApp>{
  title:string='management.claimApp.title';
  titleOperation:string='management.claimApp.titleOperation';
  screens: any = [];
  screensSelected: any = [];
  dropdownSettings: any = {};
  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
     public baseService: ClaimAppService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
      modalService: NgbModal,
    public moduleAppService: ModuleAppService,
    cdr: ChangeDetectorRef,
    private uISettingService:UISettingService,
   private screenAppService:ScreenAppService,



  ) {
    super(
      routerActive,
      translateService,
      modalService,
       baseService,
      alertService,
      datePipe,
      loader,cdr
     );
  }
  public ngOnInitMore() {
    this.dropdownSettings=this.uISettingService.getDropdownSetting();


    this.dropdownSettings.singleSelection=true;
    this.getScreensApp();
 }
 getScreensApp() {
  this.screenAppService.getallList().pipe(takeUntil(this.notifier)).subscribe(
    (res) => { this.screens = res },
    () => { this.alertService.error('management.failGetScreensApp'); }
  )
}

 EditModel( id:any, template: any,size:string="md") {
  this.isEditForm = true;
  this.baseService.getById(id).pipe(takeUntil(this.notifier)).subscribe(
    (res:any) => {
      res.screenAppId= [{id:res.screenAppId,nameAr:res.screenAppNameAr}];

      this.form = res;

  this.modalService.open(template, { centered: true,size: size }).result.then();
},
    (err) => { this.alertService.error() }
  )
}

 mapForm(form: any) {
   form.screenAppId= form.screenAppId[0].id;
  return form;
}
mapRegisterForm(form: any) {
  console.log(form);
  form.screenAppId= form.screenAppId[0].id;
 return form;
}

}

