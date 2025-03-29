


import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
 import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { arLocale, defineLocale } from 'ngx-bootstrap/chronos';
import { takeUntil } from 'rxjs';
import { ClientService } from 'src/app/modules/basic-data/services/client.service';
defineLocale('ar', arLocale);

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent  extends  BaseComponent<Project>{
  title:string='basicData.Project.title';
  titleOperation:string='basicData.Project.titleOperation';
  ProjectTypes:any=[];
  ProjectsParent:any=[];
  isShow:boolean=true;
  searchForm:any={};
  bsConfig!: Partial<BsDatepickerConfig>;
  modalities:any={};
  dropdownSettings: any = {};
  clients:any=[];

  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
     public baseService: ProjectService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
      modalService: NgbModal,
    public ProjectService: ProjectService,
    public clientService: ClientService,
    cdr: ChangeDetectorRef,
    private localeService: BsLocaleService,

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
    this.dateConfig();
    this.translateChange();
    this.getClients();
    this.getDropListSettting();
  }
  dateConfig() {          // ngx-date config
    this.bsConfig = {
      isAnimated: true,
      dateInputFormat: 'YYYY-MM-DD',
      containerClass: 'theme-blue',
    }
  }
translateChange() {
  let lang = this.translateService.currentLang;
  let langLocal = lang == "ar" ? "ar" : lang == "us" ? "en" : lang;
  this.localeService.use(langLocal);
  this.translateService.onLangChange.pipe(takeUntil(this.notifier)).subscribe(    // observer langaue change
    (res: any) => {
      let lang = res.lang == "ar" ? "ar" : res == "us" ? "en" : res.lang;
      this.localeService.use(lang);
    }
  );
}
getClients(){
  this.clientService.getallList().subscribe(
    (res:any)=>{this.clients=res}
  );
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
}



