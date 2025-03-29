import { ChangeDetectorRef, Component } from '@angular/core';
import { AuditApp } from '../../model/audit-app';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
 import { NgxUiLoaderService } from 'ngx-ui-loader';
import { takeUntil, map } from 'rxjs';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { AuditAppService } from '../../services/audit-app.service';
import { ModuleAppService } from '../../services/module-app.service';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';

@Component({
  selector: 'app-audit-app',
  templateUrl: './audit-app.component.html',
  styleUrls: ['./audit-app.component.scss']
})
export class AuditAppComponent extends BaseComponent<AuditApp>{
  title: string = 'management.auditApp.title';
  titleOperation: string = 'management.auditApp.titleOperation';
  baseTranslate = "management.auditApp.";
  screenName: any = "auditApp";
  pagination?: any; // pagination
  tablesNameSelected: any = [];
  dropdownSettings: any = {};
  oldValues: any = {};
  newValues: any = {};
  keyChangeObject: any = [];
  keyOldValues: any = [];
  keyNewValues: any = [];
  BlockKeys = ['id'];
  changeEntity: any = [];
  tablesName: any = [];
  status: any = [];
  statesSelected: any = [];
  levels: any = [];
  levelSelected: any = [];
  isShow:boolean=true;
  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
    public baseService: AuditAppService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
    modalService: NgbModal,
    public moduleAppService: ModuleAppService,
    cdr: ChangeDetectorRef,
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
  ngOnInitMore() {
    this.getTableName();
    this.getState();
    this.getLevelAudit();
    this.getDropListSettting();

  }
  ngAfterViewInitMore() {
    this.configPagination();

  }
  configPagination() {
    let screen = localStorage.getItem(this.screenName);
    if (screen != null) {
      this.pagination = JSON.parse(screen);
       this.configDropList();
      this.OnSearch();
      }
  }



  configDropList() {
    if (this.pagination.tablesName.length > 0) {
      this.pagination.tablesName.forEach((item: any) => {
        this.tablesNameSelected.push({ id: item, name: this.getTranslationText(this.baseTranslate + item) });
      });
    }
    if (this.pagination.levels.length > 0) {
      this.pagination.levels.forEach((item: any) => {
        this.levelSelected.push({ id: item, name: this.getTranslationText(this.baseTranslate + item) });
      });
    }
    if (this.pagination.states.length > 0) {
      this.pagination.states.forEach((item: any) => {
        this.statesSelected.push({ id: item, name: this.getTranslationText(this.baseTranslate + item) });
      });
    }
  }
  getScreen(screen: string): string {
    if (screen == null || screen == '' || screen == undefined)
      return "";
    let tag = "management.auditApp.";
    return `${this.getTranslationText(tag + screen)}`;

  }
  getStatus(status: string): string {
    if (status == null || status == '' || status == undefined)
      return "";
    let tag = "management.auditApp.";
    switch (status) {
      case "register": return `<span class="badge badge-success "> ${this.getTranslationText(tag + status)}</span> `;
      case "delete": return `<span class="badge badge-danger "> ${this.getTranslationText(tag + status)}</span> `;
      case "login": return `<span class="badge badge-success "> ${this.getTranslationText(tag + status)}</span> `;
      case "logout": return `<span class="badge badge-info "> ${this.getTranslationText(tag + status)}</span> `;
      case "appStart": return `<span class="badge badge-primary "> ${this.getTranslationText(tag + status)}</span> `;
      case "appClose": ; return `<span class="badge badge-danger "> ${this.getTranslationText(tag + status)}</span> `;
      default:   return `<span class="badge  badge-primary "> ${this.getTranslationText(tag + status)}</span> `;
    }
  }

  getLevel(level: string): string {
    if (level == null || level == '' || level == undefined)
      return "";
    let tag = "management.auditApp.";
    if (level == "Warning")
      return `<span class="badge  badge-danger "> ${this.getTranslationText(tag + level)}</span> `;
    else
      return `<span class="badge badge-primary "> ${this.getTranslationText(tag + level)}</span> `;
  }
  EditModel(id:any, template: any,size:string="lg") {
    this.isEditForm = true;

    this.baseService.getById(id).pipe(takeUntil(this.notifier)).subscribe(
      (res) => {
        this.form = res;
        this.configValue(res);
        this.modalService.open(template, { centered: true,size: size }).result.then();


      },
      (err) => { this.alertService.error() }
    )
  }

  configValue(audit: any) {
    this.oldValues = {};
    this.keyOldValues = [];
    this.newValues = {};
    this.keyNewValues = [];
    if (audit.oldValues != null) {
      this.oldValues = JSON.parse(audit.oldValues);
      this.keyOldValues = Object.keys(this.oldValues);
    }
    if (audit.newValues != null) {
      this.newValues = JSON.parse(audit.newValues);
      this.keyNewValues = Object.keys(this.newValues);
    }
    this.getChangeEntity();
  }

  getChangeEntity() {
    let keys: any = [];
    this.changeEntity = [];
    if (this.keyNewValues.length > 0 && this.keyOldValues.length > 0)
      keys = this.keyNewValues;
    else if (this.keyNewValues.length <= 0 && this.keyOldValues.length > 0)
      keys = this.keyOldValues;
    else if (this.keyNewValues.length > 0 && this.keyOldValues.length <= 0)
      keys = this.keyNewValues;
    keys.forEach((key: any) => {

      if (this.BlockKeys.includes(key.toLowerCase())) {
        return;
      }
      else {
        this.changeEntity.push({
          name: key,
          newValue: this.newValues[key] || "",
          oldValue: this.oldValues[key] || "",
          isChange: !(this.newValues[key] || "") == (this.oldValues[key] || "")
        });
      }
    });
  }
  getDropListSettting() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "name",
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
  OnSearch(event:any={}) {
    this.ngxLoader.startLoader(this.searchLoader);
    this.pagination.tablesName = this.tablesNameSelected.length > 0 ? this.tablesNameSelected.map((a: any) => a.id) : [];
    this.pagination.levels = this.levelSelected.length > 0 ? this.levelSelected.map((a: any) => a.id) : [];
    this.pagination.states = this.statesSelected.length > 0 ? this.statesSelected.map((a: any) => a.id) : [];
    localStorage.setItem(this.screenName, JSON.stringify(this.pagination));
     this.loadentities();

  }
  OnReset(status: Boolean) {
    this.tablesNameSelected = [];
    this.levelSelected = [];
    this.statesSelected = [];
    this.pagination = {
      pageNumber: 1,
      pageSize: 10
    };
  }
  getTableName() {
    this.baseService.getTableName().pipe(takeUntil(this.notifier)).pipe(
      map((result: any) => {
        let resultArr: any = [];
        result.forEach((item: any) => {
          if (item.name == null)
            return;
          let table = { id: item.id, name: this.getTranslationText(this.baseTranslate + item.name) };

          resultArr.push(table);
        });
        return resultArr;
      })
    ).subscribe(
      (res) => { this.tablesName = res },
      () => { this.alertService.error('management.auditApp.failGetTableName'); }
    )
  }
  getState() {
    this.baseService.getState().pipe(takeUntil(this.notifier)).pipe(
      map((result: any) => {
        let resultArr: any = [];
        result.forEach((item: any) => {
          if (item.name == null)
            return;
          resultArr.push({ id: item.id, name: this.getTranslationText(this.baseTranslate + item.name) });
        });
        return resultArr;

      })

    ).subscribe(
      (res) => { this.status = res },
      () => { this.alertService.error('management.auditApp.failGetState'); }
    )
  }
  getLevelAudit() {
    this.baseService.getLevel().pipe(takeUntil(this.notifier)).pipe(
      map((result: any) => {
        let resultArr: any = [];
        result.forEach((item: any) => {
          if (item.name == null)
            return;
          resultArr.push({ id: item.id, name: this.getTranslationText(this.baseTranslate + item.name) });
        });
        return resultArr;

      })

    ).subscribe(
      (res) => { this.levels = res },
      () => { this.alertService.error('management.auditApp.failGetLevel'); }
    )
  }
  onScreensChange(value: any) {

  }
}

