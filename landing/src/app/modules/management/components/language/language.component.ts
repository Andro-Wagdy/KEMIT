import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { Language } from '../../model/language';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { LanguageService } from '../../services/language.service';
import { ModuleAppService } from '../../services/module-app.service';
import { materialize, delay, dematerialize, takeUntil, finalize } from 'rxjs';
@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent extends BaseComponent<Language>{
  title: string = 'management.language.title';
  titleOperation: string = 'management.language.titleOperation';
  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
    public baseService: LanguageService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
    modalService: NgbModal,
    public moduleAppService: ModuleAppService,
    cdr: ChangeDetectorRef,
    public languageService: LanguageService,
    private router: Router

  ) {
    super(
      routerActive,
      translateService,
      modalService,
      baseService,
      alertService,
      datePipe,
      loader, cdr
    );
  }
  setDefault() {
    this.loader = true;
    let id = this.selectedRow[0].id;
    this.languageService.SetDefault(id)
      .pipe(
        materialize(),
        delay(500),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() => (this.loader = false))
      ).subscribe(
        () => { this.alertService.success(); this.loadentities() },
        () => { this.alertService.error() }
      )
  }
  changeText() {
    let id = this.selectedRow[0].id;
    this.router.navigateByUrl("/dashboard/management/language/" + id + "/texts")
  }
  changeTextById(id:any) {
    this.router.navigateByUrl("/dashboard/management/language/" + id + "/texts")
  }



}

