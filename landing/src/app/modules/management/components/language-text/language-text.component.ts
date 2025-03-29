import { ChangeDetectorRef, Component } from '@angular/core';
import { LanguageText } from '../../model/language-text';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
 import { NgxUiLoaderService } from 'ngx-ui-loader';
import { materialize, delay, dematerialize, takeUntil, finalize } from 'rxjs';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { LanguageTextService } from '../../services/language-text.service';
import { LanguageService } from '../../services/language.service';
import { ModuleAppService } from '../../services/module-app.service';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { ScreenAppService } from '../../services/screen-app.service';
import { PageInfoService } from 'src/app/_metronic/layout';

@Component({
  selector: 'app-language-text',
  templateUrl: './language-text.component.html',
  styleUrls: ['./language-text.component.scss']
})
export class LanguageTextComponent extends BaseComponent<LanguageText>{
  title: string = 'management.languageText.title';
  titleOperation: string = 'management.languageText.titleOperation';
  pagination?: any; // pagination
  languages: any = [];
  screens: any = [];
  screensSelected: any = [];
  dropdownSettings: any = {};
  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
    public baseService: LanguageTextService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
    modalService: NgbModal,
    public moduleAppService: ModuleAppService,
    cdr: ChangeDetectorRef,
    public languageService: LanguageService,
    private router: Router,
    public screenAppService: ScreenAppService,
    private pageInfo: PageInfoService

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
  ngOnInitMore() {
    this.pagination.languageId = this.routerActive.snapshot.paramMap.get('id')!;
    this.getScreensApp();
    this.getLanguagesApp();
    this.getDropListSettting();
    this.pageInfo.updateTitle(this.title);
  }
  getScreensApp() {
    this.screenAppService.getallList().pipe(takeUntil(this.notifier)).subscribe(
      (res) => { this.screens = res },
      () => { this.alertService.error('management.failGetScreensApp'); }
    )
  }
  getLanguagesApp() {
    this.languageService.getallList().pipe(takeUntil(this.notifier)).subscribe(
      (res) => { this.languages = res },
      () => { this.alertService.error('management.failGetLanguagesApp'); }
    )
  }
  getDropListSettting() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "nameAr",
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 200,
      itemsShowLimit: 1,
      searchPlaceholderText: this.getTranslationText("general.action.search"),
      noDataAvailablePlaceholderText: this.getTranslationText("general.message.noData"),
      noFilteredDataAvailablePlaceholderText: this.getTranslationText("general.message.noData"),
      closeDropDownOnSelection: true,
      showSelectedItemsAtTop: true,
      selectAllText: this.getTranslationText("general.message.selectAll"),
      unSelectAllText: this.getTranslationText("general.message.unSelectAll"),
      defaultOpen: false,
      allowRemoteDataSearch: false
    };

  }

  OnSearch(form: any) {
    this.ngxLoader.startLoader(this.searchLoader);
      this.pagination.screenId = this.screensSelected.map((a: any) => a.id);
     this.loadentities();
  }
  OnReset(status: Boolean) {
    this.screensSelected = [];
    this.pagination = {
      pageNumber: 1,
      pageSize: 10
    };
  }



}

