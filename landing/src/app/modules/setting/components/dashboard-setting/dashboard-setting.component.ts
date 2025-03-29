import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, dematerialize, finalize, materialize, takeUntil } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { SpinnerType } from 'ngx-ui-loader/lib/utils/types';
import { loaderOperationShap, operationLoader } from 'src/app/_metronic/models/shard-string';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { UserService } from 'src/app/modules/management/services/user.service';
import { PageInfoService } from 'src/app/_metronic/layout';
import { DashboardSettingService } from '../../services/dashboard-setting.service';
type Tabs =
| 'basic_data'
| 'advanced'
| 'seo'
;
@Component({
  selector: 'app-dashboard-setting',
  templateUrl: './dashboard-setting.component.html',
  styleUrls: ['./dashboard-setting.component.scss']
})
export class DashboardSettingComponent  implements OnInit, OnDestroy {
  title:any="";
  form !: UntypedFormGroup;  // form group
  loader: boolean = false; // loader
  notifier = new Subject<void>();  // valiable destory
  isEditForm: boolean = false;
  roles: any = [];
  userRole: any = [];
  dropdownSettings: any = {};
  loaderOperationShap: SpinnerType = loaderOperationShap;
  operationLoader: string = operationLoader;
  lang: string = "ar";
  doctors: any = [];
  modalities: any = [];
  status: any = [];
  affilateSettingMedia =environment.dashboardSettingMedia;
  private pageInfo: PageInfoService;
  logoPathFile:any={};
  smallLogoPathFile:any={};
  landingMainPathFile:any={};
  landingAboutPathFile:any={};
  landingJoinUsPathFile:any={};
  hospitals:any=[];
  activeTab: Tabs = 'basic_data';
  attachmentsUpload: any = [];
  apiUrl = environment.dashboardSettingMedia;
  fileUpload: any = "";
  constructor( // call DI
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private routerActive: ActivatedRoute,
    protected ngxLoader: NgxUiLoaderService,
    private baseService: DashboardSettingService,
    private translateService: TranslateService,
    public datePipe: DatePipe,
    public router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private location: Location) { }
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    event.preventDefault();
    event.returnValue = true;
  }
  // public logoPathFile = new FileUploadControl({}, FileUploadValidators.filesLimit(1));
  // public reportPathFile = new FileUploadControl({}, FileUploadValidators.filesLimit(1));
  // public reportreportHeaderPath = new FileUploadControl({}, FileUploadValidators.filesLimit(1));
  // public reportreportFooterPath = new FileUploadControl({}, FileUploadValidators.filesLimit(1));

  ngOnInit() {
    // this.pageInfo.updateTitle(this.title);

    this.createForm();// call build form
    this.configRoute();
    this.getSettings();
  }

  getSettings(){
    this.baseService.get().subscribe(
      (res:any)=>{
        this.form.patchValue(res);
    this.cdr.detectChanges();

      }
    );
  }
  createForm() {         // build form
    this.form = this.fb.group({
      displayName: [""],
      bsPrimary: [""],
      bsSecondPrimary: [""],
      bsPrimaryInverse: [""],
      phones: ["",],
      address: [""],
      logoPath: [""],
      smallLogoPath: [""],
      landingPrimary: [""],
      landingSecondPrimary: [""],
      landingMainPath: [""],
      landingAboutPath: [""],
      landingJoinUsPath: [""],
      isOpenLandindOne :[false],
      isOpenLandindTwo :[false],
      isLogoImage :[false],
      pageTitle: [""],
      pageDescription: [""],
      robots: [""],
      canonical: [""],
      ogLocale: [""],
      ogSiteName: [""],
      ogType: [""],
      ogTitle: [""],
      ogDescription: [""],
      ogUrl: [""],
      twitterCard: [""],
      twitterTitle: [""],
      twitterDescription: [""],
      email: [""],
      facebookUrl: [""],
      youtubeUrl: [""],
      instgramUrl: [""],
      linkedinUrl: [""],
      whatsUrl: [""],
      domainName: [""],

      id: [""],
    }
    )
  }

  configRoute() {
    this.routerActive.data.pipe(takeUntil(this.notifier)).subscribe(         ///get data from route ==>{EmailWriteResolver}
      (res) => {
        if (res['data']) {
          this.isEditForm = true;
          this.form.patchValue(res['data']);
        }
      }, () => { this.alertService.error() }
    );
  }

  edit() { // register form
    this.ngxLoader.startLoader(this.operationLoader);
    let form = this.mapEntity(this.form.value);
    this.baseService.edit(form)
      .pipe( // rxjs operatots
        materialize(),
        delay(200),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() => this.ngxLoader.stopLoader(this.operationLoader))
      )
      .subscribe(
        () => { this.alertService.success() ;this.getSettings()},
        (err) => { this.alertService.error(err); },
      );
  }
  mapEntity(form: any) {
    let model = new FormData();
    model.append('id', form.id!=null?form.id:"");
    model.append('address', form.address==null?"":form.address);
    model.append('displayName', form.displayName==null?"":form.displayName);
    model.append('email', form.email==null?"":form.email);
    model.append('facebookUrl', form.facebookUrl==null?"":form.facebookUrl);
    model.append('youtubeUrl', form.youtubeUrl==null?"":form.youtubeUrl);
    model.append('instgramUrl', form.instgramUrl==null?"":form.instgramUrl);
    model.append('linkedinUrl', form.linkedinUrl==null?"":form.linkedinUrl);
    model.append('whatsUrl', form.whatsUrl==null?"":form.whatsUrl);
    model.append('domainName', form.domainName==null?"":form.domainName);

    model.append('bsPrimary', form.bsPrimary==null?"":form.bsPrimary);
    model.append('bsSecondPrimary', form.bsSecondPrimary==null?"":form.bsSecondPrimary);
    model.append('landingPrimary', form.landingPrimary==null?"":form.landingPrimary);
    model.append('landingSecondPrimary', form.landingSecondPrimary==null?"":form.landingSecondPrimary);
    model.append('bsPrimaryInverse', form.bsPrimaryInverse==null?"":form.bsPrimaryInverse);
    model.append('phones', form.phones==null?"":form.phones);
    model.append('isDeletedLogoPathFile', this.logoPathFile?.isDeleted??false);
    model.append('isDeletedSmallLogoPathFile', this.smallLogoPathFile?.isDeleted??false);
    model.append('logoPathFile',this.logoPathFile.file==undefined?"":this.logoPathFile.file);
    model.append('smallLogoPathFile',this.smallLogoPathFile.file==undefined?"":this.smallLogoPathFile.file);
    model.append('landingMainPathFile',this.landingMainPathFile.file==undefined?"":this.landingMainPathFile.file);
    model.append('landingAboutPathFile',this.landingAboutPathFile.file==undefined?"":this.landingAboutPathFile.file);
    model.append('landingJoinUsPathFile',this.landingJoinUsPathFile.file==undefined?"":this.landingJoinUsPathFile.file);
    model.append('isDeletedlandingMainPathFile', this.landingMainPathFile?.isDeleted??false);
    model.append('isDeletedLandingAboutPathFile', this.landingAboutPathFile?.isDeleted??false);
    model.append('isDeletedLandingJoinUsPathFile', this.landingJoinUsPathFile?.isDeleted??false);
    model.append('isOpenLandindOne', this.isOpenLandindOne?.value);
    model.append('isOpenLandindTwo',  this.isOpenLandindTwo?.value);
    model.append('isLogoImage',  this.isLogoImage?.value);
    model.append('pageTitle', form.pageTitle==null?"":form.pageTitle);
    model.append('pageDescription', form.pageDescription==null?"":form.pageDescription);
    model.append('robots', form.robots==null?"":form.robots);
    model.append('canonical', form.canonical==null?"":form.canonical);
    model.append('ogLocale', form.ogLocale==null?"":form.ogLocale);
    model.append('ogSiteName', form.ogSiteName==null?"":form.ogSiteName);
    model.append('ogType', form.ogType==null?"":form.ogType);
    model.append('ogTitle', form.ogTitle==null?"":form.ogTitle);
    model.append('ogDescription', form.ogDescription==null?"":form.ogDescription);
    model.append('ogUrl', form.ogUrl==null?"":form.ogUrl);
    model.append('twitterCard', form.twitterCard==null?"":form.twitterCard);
    model.append('twitterTitle', form.twitterTitle==null?"":form.twitterTitle);
    model.append('twitterDescription', form.twitterDescription==null?"":form.twitterDescription);
    return model;
  }

  getTranslationText(text: any) {
    let result = '';
    this.translateService.get(text).pipe(takeUntil(this.notifier)).subscribe((res: string) => {
      result = res;
    })
    return result;
  }
  onGoList() {
    this.router.navigateByUrl("/basicData/branches");
  }
  /// form controll get
  get formRegister() {
    return this.form;

  }
  get displayName() {
    return this.form.get('displayName');
  }
  get bsPrimary() {
    return this.form.get('bsPrimary');
  }
  get bsSecondPrimary() {
    return this.form.get('bsSecondPrimary');
  }
  get bsPrimaryInverse() {
    return this.form.get('bsPrimaryInverse');
  }

  get emailAdress() {
    return this.form.get('emailAdress');
  }
  get phones() {
    return this.form.get('phones');
  }
  get isDiaplayAsMarchant() {
    return this.form.get('isDiaplayAsMarchant');
  }

  get address() {
    return this.form.get('address');
  }
  get logoPathField() {
    return this.form.get('logoPath');
  }
  get smallLogoPathField() {
    return this.form.get('smallLogoPath');
  }
  get reportPathField() {
    return this.form.get('reportPath');
  }

  get landingPrimary() {
    return this.form.get('landingPrimary');
  }

  get landingSecondPrimary() {
    return this.form.get('landingSecondPrimary');
  }
  get reportHeaderPathField() {
    return this.form.get('reportHeaderPath');
  } get reportFooterPathFiled() {
    return this.form.get('reportFooterPath');
  }
  get id() {
    return this.form.get('id');
  }
  get landingMainPathField() {
    return this.form.get('landingMainPath');
  }
  get landingAboutPathField() {
    return this.form.get('landingAboutPath');
  }
  get landingJoinUsPathField() {
    return this.form.get('landingJoinUsPath');
  }
  get isOpenLandindOne() {
    return this.form.get('isOpenLandindOne');
  }
  get isOpenLandindTwo() {
    return this.form.get('isOpenLandindTwo');
  }
  get isLogoImage() {
    return this.form.get('isLogoImage');
  }

  get email() {
    return this.form.get('email');
  }
  get facebookUrl() {
    return this.form.get('facebookUrl');
  }
  get youtubeUrl() {
    return this.form.get('youtubeUrl');
  }
  get instgramUrl() {
    return this.form.get('instgramUrl');
  }
  get linkedinUrl() {
    return this.form.get('linkedinUrl');
  }
  get whatsUrl() {
    return this.form.get('whatsUrl');
  }
  get domainName() {
    return this.form.get('domainName');
  }

  back(){
    this.router.navigateByUrl("/");
  }
  saveChangeImage(files: any) {
    let file=<FileList>files[0] as any;
    this.logoPathFile.file=file;
    this.logoPathFile.isDeleted=false;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logoPathFile.path=e.target.result;
    this.cdr.detectChanges();
    };
   reader.readAsDataURL(file );
  }
  saveChangelandingMainImage(files: any) {
    let file=<FileList>files[0] as any;
    this.landingMainPathFile.file=file;
    this.landingMainPathFile.isDeleted=false;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.landingMainPathFile.path=e.target.result;
    this.cdr.detectChanges();
    };
   reader.readAsDataURL(file );
  }
  removelandingMainField(){
    this.landingMainPathFile={};
    this.landingMainPathFile.isDeleted=true;
    this.landingMainPathFile?.reset();
  }

  saveChangelandingAboutImage(files: any) {
    let file=<FileList>files[0] as any;
    this.landingAboutPathFile.file=file;
    this.landingAboutPathFile.isDeleted=false;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.landingAboutPathFile.path=e.target.result;
    this.cdr.detectChanges();
    };
   reader.readAsDataURL(file );
  }
  removeLandingAboutField(){
    this.landingAboutPathFile={};
    this.landingAboutPathFile.isDeleted=true;
    this.landingAboutPathFile?.reset();
  }
  saveChangelandingJoinUsImage(files: any) {
    let file=<FileList>files[0] as any;
    this.landingJoinUsPathFile.file=file;
    this.landingJoinUsPathFile.isDeleted=false;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.landingJoinUsPathFile.path=e.target.result;
    this.cdr.detectChanges();
    };
   reader.readAsDataURL(file );
  }
  removelandingJoinUsField(){
    this.landingJoinUsPathFile={};
    this.landingJoinUsPathFile.isDeleted=true;
    this.landingJoinUsPathFile?.reset();
  }

  saveChangeSmallLogoImage(files: any) {
    let file=<FileList>files[0] as any;
    this.smallLogoPathFile.file=file;
    this.smallLogoPathFile.isDeleted=false;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.smallLogoPathFile.path=e.target.result;
    this.cdr.detectChanges();
    };
   reader.readAsDataURL(file );
  }

  removeLogoPathField(){
    this.logoPathFile={};
    this.logoPathFile.isDeleted=true;
    this.logoPathField?.reset();
  }
  removeSmallLogoPathField(){
    this.smallLogoPathFile={};
    this.smallLogoPathFile.isDeleted=true;
    this.smallLogoPathField?.reset();
  }

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }
  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }

  viewLogo(){
    let path=(this.logoPathFile.path)?this.logoPathFile.path:(this.affilateSettingMedia+this.logoPathField?.value);
    this.viewImage(path);
  }
  viewSmalLogo(){
    let path= (this.smallLogoPathFile.path)?this.smallLogoPathFile.path:(this.affilateSettingMedia+this.smallLogoPathField?.value);
    this.viewImage(path);
  }
  viewlandingMainPath(){
    let path= (this.landingMainPathFile.path)?this.landingMainPathFile.path:(this.affilateSettingMedia+this.landingMainPathField?.value);
    this.viewImage(path);
  }
  viewLandingAboutPath(){
    let path= (this.landingAboutPathFile.path)?this.landingAboutPathFile.path:(this.affilateSettingMedia+this.landingAboutPathField?.value);
    this.viewImage(path);
  }
  viewLandingJoinUsPath(){
    let path= (this.landingJoinUsPathFile.path)?this.landingJoinUsPathFile.path:(this.affilateSettingMedia+this.landingJoinUsPathField?.value);
    this.viewImage(path);
  }
  viewImage(path:any){
    let  newTab:any = window.open();
    newTab.document.write('<html><body style="margin: 1rem;"><img src="' + path + '" style="max-width: 50%; max-height:50%;"></body></html>');
  }
  ngOnDestroy(): void {   // destpory subscription
    this.notifier.next();
    this.notifier.complete();
  }
}










