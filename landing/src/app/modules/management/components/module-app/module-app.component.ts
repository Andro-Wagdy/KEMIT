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

@Component({
  selector: 'app-module-app',
  templateUrl: './module-app.component.html',
  styleUrls: ['./module-app.component.scss']
})
export class ModuleAppComponent   extends  BaseComponent<ModuleApp>{
  title:string='management.moduleApp.title';
  titleOperation:string='management.moduleApp.titleOperation';
  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
     public baseService: ModuleAppService,
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
  }



}

