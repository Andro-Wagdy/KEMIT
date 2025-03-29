import { DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SpinnerType } from 'ngx-ui-loader/lib/utils/types';
import {
  Subject,
  takeUntil,
  materialize,
  delay,
  dematerialize,
  finalize,
} from 'rxjs';
import {
  loaderOperationShap,
  operationLoader,
} from 'src/app/_metronic/models/shard-string';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { ClientService } from 'src/app/modules/basic-data/services/client.service';
import { ProjectService } from '../../services/project.service';
import { ProcessType } from 'src/app/modules/basic-data/models/process-type';
import { DegreeService } from 'src/app/modules/basic-data/services/degree.service';
import { ProcessTypeService } from 'src/app/modules/basic-data/services/process-type.service';
import { Degree } from 'src/app/modules/basic-data/models/degree';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ProjectFiled } from '../../models/project-filed';
import { Client } from 'src/app/modules/basic-data/models/client';
import { TranslateService } from '@ngx-translate/core';
import arabicToEnglish from 'node_modules/letter-convertor/lib/index';
import { DocumentType } from 'src/app/modules/basic-data/models/document-type';
import { DocumentTypeService } from 'src/app/modules/basic-data/services/document-type.service';


type Tabs = 'projectInfo' | 'paper' | 'fileds';
@Component({
  selector: 'app-project-operation',
  templateUrl: './project-operation.component.html',
  styleUrls: ['./project-operation.component.scss'],
})
export class ProjectOperationComponent implements OnInit, OnDestroy {
  title: string = 'management.user.title';
  domian: string = '@local.com';
  form!: UntypedFormGroup; // form group
  loader: boolean = false; // loader
  notifier = new Subject<void>(); // valiable destory
  isEditForm: boolean = false;
  roles: any = [];
  rolesSelected: any = [];
  userRole: any;
  dropdownSettings: any = {};
  loaderOperationShap: SpinnerType = loaderOperationShap;
  operationLoader: string = operationLoader;
  activeTab: Tabs = 'projectInfo';
  documentTypes: DocumentType[] = [];
  processTypes: ProcessType[] = [];
  degrees: Degree[] = [];
  client: Client[] = [];
  statusEdit = false;
  bsConfig!: Partial<BsDatepickerConfig>;
  processType?: ProcessType;
  tempProcessId: any = null;
  typeFiled = '';


  constructor(
    // call DI
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    public projectService: ProjectService,
    public clientService: ClientService,
    private degreeService: DegreeService,
    private documentTypeService: DocumentTypeService,
    private processTypeService: ProcessTypeService,
    private routerActive: ActivatedRoute,
    protected ngxLoader: NgxUiLoaderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private  datePipe: DatePipe,
    private translateService:TranslateService,
    private localeService: BsLocaleService,


  ) {}
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    event.preventDefault();
    event.returnValue = true;
  }
  ngOnInit() {
    this.getEntities();
    this.getDegrees();
    this.getDocumentTypes();
    this.getProcessTypes();
    this.createForm();
    this.dateConfig();
    // this.configRoute();
    this.translateChange();

    // this.items = this.getItems(this.simpleItems);
    this.getDropListSettting();
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
  getTranslationText(text: any) {
    let result:string = '';
    this.translateService.get(text).pipe(takeUntil(this.notifier)).subscribe(
      (res:any)=>{ result = res},
     )
    return result;
  }
  getEntities() {
    this.clientService
      .getallList()
      .pipe(
        takeUntil(this.notifier)
        )
      .subscribe(
        (res: any) => {
          this.client = res;
        },
        (error: any) => {
          this.alertService.error('error.failGetEntities');
        }
      );
  }
  getDegrees() {
    this.degreeService
      .getallList()
      .pipe(takeUntil(this.notifier))
      .subscribe(
        (res: any) => {
          this.degrees = res;
        },
        (error: any) => {
          this.alertService.error('error.failGetDegrees');
        }
      );
  }
  getDocumentTypes() {
    this.documentTypeService
      .getallList()
      .pipe(takeUntil(this.notifier))
      .subscribe(
        (res: any) => {
          this.documentTypes = res;
        },
        (error: any) => {
          this.alertService.error('error.failGetDocumentTypes');
        }
      );
  }
  getProcessTypes() {
    this.processTypeService
      .getallList()
      .pipe(takeUntil(this.notifier))
      .subscribe(
        (res: any) => {
          this.processTypes = res;
          if (this.tempProcessId != null) {
            this.processChange(this.tempProcessId);
            this.tempProcessId = null;
          }
        },
        (error: any) => {
          this.alertService.error('error.failGetProcessTypes');
        }
      );
  }
  translateChange() {
    let lang = this.translateService.currentLang;
    this.localeService.use(lang);
    this.translateService.onLangChange.pipe(takeUntil(this.notifier)).subscribe(
      // observer langaue change
      (res) => {
        this.localeService.use(res.lang);
      }
    );
  }
  createForm() {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      nameFolder: ['', Validators.required],
      date: ['', Validators.required],
      isFinished: [false],
      recipientName: [''],
      senderName: [''],
      deptName: [''],
      managerName: [''],
      noteReport: [''],
      note: [''],
      numberDocument: [1, Validators.required],
      documentTypeId: ['', Validators.required],
      recipientDegreeId: [null],
      senderDegreeId: [null],
      deptDegreeId: [null],
      managerDegreeId: [null],
      entityId: ['', Validators.required],
      processTypeId: ['', Validators.required],
      projectsFileds: this.fb.array([]),
    });
  }

  nameChanged(value: any) {
    let trans = arabicToEnglish(value);
    this.nameFolder?.setValue(trans);
  }
  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }
  submitForm() {
    this.loader = true;
    let formSend = this.form.getRawValue();
    formSend.date=   this.datePipe.transform(formSend.date , 'yyyy-MM-ddT00:00:00')!;
    formSend.entityId = formSend.entityId[0].id;
    this.projectService
      .register(formSend)
      .pipe(
        materialize(),
        delay(500),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() => (this.loader = false))
      )
      .subscribe(
        (res) => {
          this.alertService.success();
          this.resetForm();
        },
        (err) => {
          this.alertService.error(err);
        }
      );
  }
  resetForm() {
    this.form.reset();
  }

  updateForm() {
    this.loader = true;
    let formSend = this.form.getRawValue();
    formSend.date=   this.datePipe.transform(formSend.date , 'yyyy-MM-ddT00:00:00')!;
    formSend.entityId = formSend.entityId[0].id;
    this.projectService
      .edit(this.id?.value, formSend)
      .pipe(
        materialize(),
        delay(500),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() => (this.loader = false))
      )
      .subscribe(
        (res) => {
          this.getProject(this.id?.value);
          this.alertService.success();
        },
        (err) => {
          this.alertService.error(err);
        }
      );
  }
  getProject(id: any) {
    this.projectService
      .getById(id)
      .pipe(takeUntil(this.notifier))
      .subscribe(
        (res) => {
          this.employeeEditRouteConfig(res);
        },
        (err) => this.alertService.error()
      );
  }
  employeeEditRouteConfig(data: any) {
    this.title = 'edit';
    this.statusEdit = true;

    data.entityId = [{ id: data.entityId, name: data.entityName }];
    this.processChange(data.processTypeId);
    this.form.patchValue(data);
    if (data.projectsFileds) this.configSProjectFiled(data.projectsFileds);
  }
  configSProjectFiled(fileds: ProjectFiled[]) {
    this.projectsFileds.setValue([]);
    fileds.forEach((filed) => {
      this.addProjectFiled(
        filed.id,
        filed.filedName,
        filed.filedLabel,
        filed.filedType,
        filed.isRequired,
        filed.listItem
      );
    });
  }
  dateConfig() {
    // ngx-date config
    this.bsConfig = {
      isAnimated: true,
      dateInputFormat: 'YYYY-MM-DD',
      containerClass: 'theme-blue',
    };
  }
  processChange(value: any) {
    if (this.processTypes.length > 0)
      this.processType = this.processTypes.filter((a) => a.id == value)[0];
    else this.tempProcessId = value;
  }
  onSelectedChange(value: any) {}
  onFilterChange(value: any) {}
  buildProjectFiled(
    id?: number,
    filedName: string = '',
    filedLabel: string = '',
    filedType: string = '',
    isRequired: boolean = false,
    listItem: string = ''
  ): UntypedFormGroup {
    return this.fb.group({
      filedName: [filedName],
      filedLabel: [filedLabel],

      filedType: [filedType],
      isRequired: [isRequired],
      listItem: [listItem],
      id: [id],
    });
  }

  addProjectFiled(
    id?: number,
    filedName: string = '',
    filedLabel: string = '',
    filedType: string = '',
    isRequired: boolean = false,
    listItem: string = ''
  ) {
    console.log(id);
    this.projectsFileds?.push(
      this.buildProjectFiled(
        id,
        filedName,
        filedLabel,
        filedType,
        isRequired,
        listItem
      )
    );
  }

  removeProjectFiled(i: number) {
    this.projectsFileds.removeAt(i);
  }
  removeFiled(id: string, index: any, dayWork: any) {
    if (!id) this.projectsFileds.removeAt(index);
    else {
      this.projectService
        .deleteFiled(id)
        .pipe(takeUntil(this.notifier))
        .subscribe(
          (res) => {
            this.alertService.success();
            this.projectsFileds.removeAt(index);
          },
          (err) => this.alertService.error()
        );
    }
  }
  filedNameDbChange(value: any) {
    console.log(value);
    console.log(this.projectsFileds.value);
    var fileds = this.projectsFileds.value;
    fileds.forEach((filed: any, index: any) => {
      if (value == index) {
    console.log(index);
    console.log(filed);

        fileds[index].filedLabel = fileds[index].filedName
          .split('_')
          .toString();
      }
    });
     this.projectsFileds.setValue(fileds);
  }
  back(){

  }
  changeFiledType(data: any) {
    this.typeFiled = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.notifier.next();
    this.notifier.complete();


  }


  /// form controll get

  get id() {
    return this.form.get('id');
  }
  get name() {
    return this.form.get('name');
  }
  get nameFolder() {
    return this.form.get('nameFolder');
  }
  get date() {
    return this.form.get('date');
  }
  get numberkadirA4A3() {
    return this.form.get('numberkadirA4A3');
  }

  get numberkadirA0() {
    return this.form.get('numberkadirA0');
  }
  get numberTypeFilm() {
    return this.form.get('numberTypeFilm');
  }
  get numberNumberFilm16() {
    return this.form.get('numberNumberFilm16');
  }

  get numberFilm35() {
    return this.form.get('numberFilm35');
  }
  get numberAljawakit() {
    return this.form.get('numberAljawakit');
  }
  get isAllow() {
    return this.form.get('isAllow');
  }
  get isFinished() {
    return this.form.get('isFinished');
  }
  get numberPermission() {
    return this.form.get('numberPermission');
  }
  get recipientName() {
    return this.form.get('recipientName');
  }
  get senderName() {
    return this.form.get('senderName');
  }
  get deptName() {
    return this.form.get('deptName');
  }
  get managerName() {
    return this.form.get('managerName');
  }
  get noteReport() {
    return this.form.get('noteReport');
  }
  get note() {
    return this.form.get('note');
  }

  get numberDocument() {
    return this.form.get('numberDocument');
  }
  get documentTypeId() {
    return this.form.get('documentTypeId');
  }
  get recipientDegreeId() {
    return this.form.get('recipientDegreeId');
  }
  get senderDegreeId() {
    return this.form.get('senderDegreeId');
  }
  get deptDegreeId() {
    return this.form.get('deptDegreeId');
  }

  get managerDegreeId() {
    return this.form.get('managerDegreeId');
  }
  get entityId() {
    return this.form.get('entityId');
  }
  get processTypeId() {
    return this.form.get('processTypeId');
  }

  get projectsFileds(): UntypedFormArray {
    return this.form!.get('projectsFileds') as UntypedFormArray;
  }
}
