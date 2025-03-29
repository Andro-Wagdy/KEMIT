import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { ScreenApp } from '../../model/screen-app';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { takeUntil } from 'rxjs';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { ModuleAppService } from '../../services/module-app.service';
import { ScreenAppService } from '../../services/screen-app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-screen-app',
  templateUrl: './screen-app.component.html',
  styleUrls: ['./screen-app.component.scss']
})
export class ScreenAppComponent extends  BaseComponent<ScreenApp>{
  title:string='management.screenApp.title';
  titleOperation:string='management.screenApp.titleOperation';
entities:ScreenApp[]=[];
    modules:any=[];
    page=1;
  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
     public baseService: ScreenAppService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
      modalService: NgbModal,
    public moduleAppService: ModuleAppService,
    cdr: ChangeDetectorRef


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
  ngOnInitMore(){
    this.getModulesApp();
  }

 getModulesApp(){
  this.moduleAppService.getallList().pipe(takeUntil(this.notifier)).subscribe(
    (res) => { this.modules=res },
    () => { this.alertService.error('mangment.failGetModulesApp'); }
  )
 }

}

