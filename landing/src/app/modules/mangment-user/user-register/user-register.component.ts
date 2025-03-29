
import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SpinnerType } from 'ngx-ui-loader/lib/utils/types';
import { Subject, takeUntil, materialize, delay, dematerialize, finalize } from 'rxjs';
import { loaderOperationShap, operationLoader } from 'src/app/_metronic/models/shard-string';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { PageInfoService, PageLink } from 'src/app/_metronic/layout';
import { MustMatch } from '../../management/components/user-register/must-match.validator';
import { UserType } from '../../management/model/user-type.enums';
import { RolesService } from '../../management/services/roles.service';
import { UserService } from '../../management/services/user.service';
import { AuthService } from '../../management/services/auth.service';
import { UserTeamWorkService } from '../services/user-team-work.service';
type Tabs =
  | 'userData'
  | 'userSetting' ;
  @Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.scss']
  })
  export class UserRegisterComponent implements OnInit, OnDestroy {
  title: string = 'management.user.title';
  domian: string = '@local.com';
  form !: UntypedFormGroup;  // form group
  loader: boolean = false; // loader
  notifier = new Subject<void>();  // valiable destory
  isEditForm: boolean = false;
  roles: any = [];
  rolesSelected: any = [];
  userRole: any;;
  dropdownSettings: any = {};
  loaderOperationShap: SpinnerType = loaderOperationShap;
  operationLoader: string = operationLoader;
  activeTab: Tabs = 'userData';
userTypes=UserType;
  constructor( // call DI
    private fb: UntypedFormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private userService: UserService,
    private rolesService: RolesService,
    private routerActive: ActivatedRoute,
    protected ngxLoader: NgxUiLoaderService,
    public baseService: UserTeamWorkService,

    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {

  }
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    event.preventDefault();
    event.returnValue = true;
  }
  ngOnInit() {
    this.createForm();// call build form
    this.configRoute();
    // this.getRoles();

  }
  createForm() {         // build form
    this.form = this.fb.group({
      name: ['', Validators.required],

      degree: ['' ],
      jobTitle: ['' ],
      phoneNumber: [''],
      email: ['', Validators.required],
      password: ['', [Validators.minLength(4) ]],
      repassword: ['', Validators.required],
      id: [''],
      userType: ['' ],
    },
      {
        validator: MustMatch("password", "repassword")
      }
    )
  }
  configRoute() {
    this.routerActive.data.pipe(takeUntil(this.notifier)).subscribe(         ///get data from route ==>{EmailWriteResolver}
      (res) => {
        if (res['data']) {
          this.userRole = res['data'].userRole;
          this.isEditForm = true;
          this.form.patchValue(res['data']);
         }
      }, () => { this.alertService.error() }
    );
  }
  getRoles() {
    this.rolesService.getallList().subscribe(
      (res) => {
        this.roles = res;
        this.cdr.detectChanges();
      },
      () => { this.alertService.error() }
    );
  }

  register() { // register form
    this.ngxLoader.startLoader(this.operationLoader);
    let form = this.form.value;
     form.userRole = this.rolesSelected.map((a: any) => { roleId: a.id });
    this.baseService.register(form)
      .pipe( // rxjs operatots
        materialize(),
        delay(200),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(
          () => this.ngxLoader.stopLoader(this.operationLoader)
           )
      )
      .subscribe(
        () => {
          this.alertService.success();
          this.router.navigateByUrl("/security");

        },
        () => { this.alertService.error(); },
      );
  }
  edit() { // register form
    this.ngxLoader.startLoader(this.operationLoader);
    let form = this.form.value;
     this.baseService.edit(form.id, form)
      .pipe( // rxjs operatots
        materialize(),
        delay(200),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(
          () => this.ngxLoader.stopLoader(this.operationLoader)
        )
      )
      .subscribe(
        () => { this.alertService.success() },
        (err) => { this.alertService.error(err); },
      );

  }

  back(){
    this.router.navigateByUrl("/security");
  }

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }



  /// form controll get

  get formRegister() {
    return this.form;

  }
  get name() {
    return this.form.get('name');
  }


  get isSupport() {
    return this.form.get('isSupport');
  }
  get isHead() {
    return this.form.get('isHead');
  }
  get degree() {
    return this.form.get('degree');
  }
  get jobTitle() {
    return this.form.get('jobTitle');
  }
  get password() {
    return this.form.get('password');
  }
  get repassword() {
    return this.form.get('repassword');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get email() {
    return this.form.get('email');
  }
  get id() {
    return this.form.get('id');
  }
  get userType() {
    return this.form.get('userType');
  }
  get roleName() {
    return this.form.get('roleName');
  }


  ngOnDestroy(): void {   // destpory subscription
    this.notifier.next();
    this.notifier.complete();
  }
}



