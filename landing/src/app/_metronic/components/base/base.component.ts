
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
  import { Subject, catchError, delay, dematerialize, finalize, materialize, takeUntil, throwError } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

 import { DatePipe } from '@angular/common';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SpinnerType } from 'ngx-ui-loader/lib/utils/types';
import { deleteLoader, loaderDeleteShap, loaderOperationShap, loaderSearchShap, mainDelay, mainTable, onfigMd, operationLoader, searchLoader } from '../../models/shard-string';
import { BaseService } from '../../services/base-service';
import { AlertService } from '../../services/alter.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
 import { Table } from 'primeng/table';
import { DrawerComponent, MenuComponent, ScrollComponent, ToggleComponent } from '../../kt/components';

@Component({
  selector: 'app-base',
  template: '',
 })
export class BaseComponent <BaseEntityTrace> implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(Table) tableMaster: Table;
   mainDelay: number =mainDelay;
 entities?: BaseEntityTrace[] |any; // entity
  selectedRow: any[] = []; //  selected row array
  pagination?: any={
    pageNumber:1,
    pageSize:10,

  } // pagination
  notifier = new Subject<void>(); // valiable destory
  checkAll: boolean = false; // check all rowss
  checkOne: boolean = false; // check one row
  checkMore: boolean = false; // check more row
   lang?: string;
  modalRef?: any; // model delete

  loader: boolean = false; // main loader
  form: any = {}; // form gurda
  isEditForm: boolean = false;
  draw: number = 1;
  index: number = 0;
  lengthSelect: number = 0;
  screenName: any = '';
  filterToggle: boolean = true;
  start: number = 1;
  startFirstLoad: boolean = true;
   btnDisabled = true;
   moreIdSelected: any;
  loaderSearchShap: SpinnerType = loaderSearchShap;
  loaderOperationShap: SpinnerType = loaderOperationShap;
  loaderDeleteShap: SpinnerType = loaderDeleteShap;
  mainTable:string=mainTable;
  searchLoader:string=searchLoader;
  operationLoader:string=operationLoader;
  deleteLoader:string=deleteLoader;
   langArabic="ar";
 entitiesList:any[]=[];
 tableLengthSelect:any[]=[10,20,30,50,100,500,1000,5000,10000];
 maxSizePagination=10;
 idSelected:any;
  constructor(
    public routerActive: ActivatedRoute,
    public translateService: TranslateService,
    protected modalService: NgbModal,
    protected baseService: BaseService<BaseEntityTrace>,
    protected alertService: AlertService,
    protected datePipe: DatePipe,
    protected ngxLoader: NgxUiLoaderService,
    protected cdr: ChangeDetectorRef,


  ) {
    this.pagination!.pageSize=10;
    this.pagination!.pageNumber=1;

  }
  ngOnInit() {
    this.lang = this.translateService.currentLang; // get current language from  translate
   //  this.routeDataConfig();
    this.translateConfig();
    this.ngOnInitMore();
  }
  public ngOnInitMore() { }

  protected routeDataConfig() {
    this.routerActive.data.pipe(takeUntil(this.notifier)).subscribe(
      (res) => {
        this.entities = res['data'].result;
        this.pagination = res['data'].pagination!;
        this.pagination!.pageNumber = 1;
        this.pagination!.pageSize = 10;
        this.ngxLoader.stopLoader(searchLoader);
      },
      (err) => {
        this.alertService.error();
      }
    );
  }

  protected translateConfig() {
    // ngx translate change language
    this.translateService.onLangChange.pipe(takeUntil(this.notifier)).subscribe(
      // observer langaue change
      (res:any) => {
        this.lang = res.lang;
      }
    );
  }

  getTranslationText(text: any) {
    let result:string = '';
    this.translateService.get(text).pipe(takeUntil(this.notifier)).subscribe(
      (res:any)=>{ result = res},
     )
    return result;
  }

  ngAfterViewInit(): void {
    this.ngAfterViewInitMore();
  }
  ngAfterViewInitMore() { }

  getRenderString(data: any) {

    return (data!=null)? data.substring(0, 10)+"...":"";
  }
  getRenderIndex(data: any) {
    this.index++;
    return this.index;
  }

  successDataTable(res: any) {
    this.ngxLoader.stopLoader(searchLoader);
    this.pagination!.totalItems = res.pagination!.totalItems;
    this.startFirstLoad = false;
  }
  errorDataTable() {
    this.ngxLoader.stopLoader(searchLoader);
    this.alertService.error();
  }
  openModalTitle(template: TemplateRef<any>,size:string="md") {
    this.isEditForm = false;
    this.form = {};
    this.cdr.detectChanges();
    this.modalService.open(template, { centered: true,size: size });

  }
  openModal(id:any,template: TemplateRef<any>,size:string="md") {
    this.isEditForm = false;
    this.selectedRow=[{id:id}];
    this.form = {};
		this.modalService.open(template, { centered: true,size: size });
  }
  openModalMoreOperation(template: TemplateRef<any>) {
    this.isEditForm = false;
    this.moreIdSelected = this.selectedRow.map((a: any) => a.id);
    // this.modalRef = this.modalService.show(template, this.configMd);
  }
  closeModelDeleted() {
    this.modalRef?.hide();
    this.loader = false;
    this.btnDisabled = true;
  }
  OnSearch(form: any) {
    this.pagination.isTransform=this.pagination.isTransform==""?null:this.pagination.isTransform;
    this.pagination.isNotTransform=this.pagination.isNotTransform==""?null:this.pagination.isNotTransform;
    this.ngxLoader.startLoader(searchLoader);
    this.loadentities();
  }
  OnSubmit() {
    this.ngxLoader.startLoader(operationLoader);

    if (this.isEditForm === true) this.editEntity();
    else this.registerEntity();
  }
  loadentities() {
    this.ngxLoader.startLoader(searchLoader);
     this.baseService.get(this.pagination).pipe(takeUntil(this.notifier)).subscribe(
      (res:any)=>{
        this.entities=res.result;
         this.pagination!.totalItems= res.pagination?.totalItems;
         this.LoadSuccess();
         this.ngxLoader.stopLoader(searchLoader);
       this.cdr.detectChanges();
       this.menuReinitialization();

        },

         (err)=>{ this.ngxLoader.stopLoader(searchLoader);},
    );
    this.checkMore = this.checkOne = this.checkAll = false;
    this.lengthSelect = 0;
    this.selectedRow = [];
  }
  LoadSuccess(){}
  tableChange(value:any){
    this.pagination!.filterType=value.sortField;
    this.pagination!.sortType= value.sortOrder==1?"asc":'desc';
     this.loadentities();

  }
  registerEntity() {  // register entity
    let form = this.mapRegisterForm(this.form);

    this.baseService
      .register(form)
      .pipe(
        materialize(),
        delay(this.mainDelay),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() => this.ngxLoader.stopLoader(operationLoader)),
        catchError(error => {
          // handle error
          console.log(error)
          return throwError(error);
        })
      )
      .subscribe(
        () => {
          this.submitFunished();
        },
        (err) => {
          this.alertService.error('general.message.'+err);
        }
      );
  }
  editEntity() {
    let form = this.mapForm(this.form);
    this.baseService
      .edit(this.form.id, form)
      .pipe(
        materialize(),
        delay(this.mainDelay),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() => (this.ngxLoader.stopLoader(operationLoader)))
      )
      .subscribe(
        () => { this.submitFunished(); },
        (err) => {
          this.alertService.error('general.message.'+err);
        }
      );
  }
  mapForm(form: any) {
    return form;
  }
  mapRegisterForm(form: any) {
    return form;
  }
  submitFunished() {
    this.alertService.success();
    this.loadentities();
    this.modalService?.dismissAll();
    this.ngxLoader.stop(searchLoader);

    this.btnDisabled = true;
  }
  EditModel( id:any, template: any,size:string="md") {
    this.isEditForm = true;
    this.baseService.getById(id).pipe(takeUntil(this.notifier)).subscribe(
      (res) => {
        this.form = res;
		this.modalService.open(template, { centered: true,size: size });
  },
      (err) => { this.alertService.error() }
    )
  }
    EditModelTilte( template: any) {
    this.isEditForm = true;
    let id = this.selectedRow[0].id;
    this.baseService.getById(id).pipe(takeUntil(this.notifier)).subscribe(
      (res) => {
        this.form = res;
        // this.modalRef = this.modalService.show(template, this.configMd);
      },
      (err) => { this.alertService.error() }
    )
  }
 onSelectionChange(value:any){
    this.selectedRow = value;
    this.lengthSelect = value.length;

  }
  resetSelected(){
    this.selectedRow = [];
    this.lengthSelect =0;
  }

  pageChanged(value:any){
    this.pagination!.pageNumber =value;
    this.loadentities();


  }
  ListItemChange(data: any) {
     this.pagination!.pageSize = data.target.value;
    this.loadentities();

  }
  searchChange(value:any){
    this.pagination!.filterValue =value;
    this.loadentities();
 }

  DeleteConfirm() {
    this.ngxLoader.startLoader(deleteLoader);
    let entities = this.selectedRow.map((a: any) => a.id);
    this.baseService
      .deleteRange(entities)
      .pipe(
        materialize(),
        delay(this.mainDelay),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() => (this.ngxLoader.stopLoader(deleteLoader)))
      )
      .subscribe(
        () => {
          this.alertService.success();
          this.loadentities();
          this.modalService.dismissAll();
          this.resetSelected();
        },
        () => {
          this.alertService.error();
        }
      );
  }
  getIds(): any {
    return this.selectedRow.map((a: any) => a.id);
  }
  isEmpty(val: any): boolean {
    return (val === undefined || val == null || val.length) <= 0 ? true : false;
  }
  OnReset(status: Boolean) {
    this.form = {};
    this.pagination={
      pageSize:10,
      pageNumber:1,
    };

  }
  closeModel(value: any) {
    this.modalRef?.hide();
  }
  menuReinitialization() {
    setTimeout(() => {
      MenuComponent.reinitialization();
      DrawerComponent.reinitialization();
      ToggleComponent.reinitialization();
      ScrollComponent.reinitialization();
    }, 50);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.notifier.next();
    this.notifier.complete();
    this.OnDestroyMore();
  }
  OnDestroyMore() { }
}
