import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { LanguageKey } from '../../model/Language-key';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageKeyService } from '../../services/language-key.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { ModuleAppService } from '../../services/module-app.service';
import { ScreenAppService } from '../../services/screen-app.service';
import { LanguageTextService } from '../../services/language-text.service';
import { takeUntil, materialize, delay, dematerialize, finalize } from 'rxjs';

@Component({
  selector: 'app-language-key',
  templateUrl: './language-key.component.html',
  styleUrls: ['./language-key.component.scss']
})
export class LanguageKeyComponent   extends  BaseComponent<LanguageKey>{
  title:string='management.languageKey.title';
  titleOperation:string='management.languageKey.titleOperation';
  screens: any = [];

  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
     public baseService: LanguageKeyService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
      modalService: NgbModal,
    public moduleAppService: ModuleAppService,
    cdr: ChangeDetectorRef,
    private screenAppService: ScreenAppService,
    private languageTextService :LanguageTextService,


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
    this.getScreensApp();
  }
  getScreensApp() {
    this.screenAppService.getallList().pipe(takeUntil(this.notifier)).subscribe(
      (res) => { this.screens = res },
      () => { this.alertService.error('mangment.failGetScreensApp'); }
    )
  }
  updateToLanguage() {  // register entity
    this.ngxLoader.startLoader(this.searchLoader);
    this.languageTextService
      .updateToLanguage()
      .pipe(
        materialize(),
        delay(this.mainDelay),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() =>  this.ngxLoader.stopLoader(this.searchLoader)))

      .subscribe(
        (res) => {   this.alertService.success();    },
        (err) => {    this.alertService.error(); }
      );
  }


}

