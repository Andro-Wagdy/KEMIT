import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { takeUntil, delay } from 'rxjs';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { searchLoader } from 'src/app/_metronic/models/shard-string';
type Tabs =
  | 'userData'
  | 'userSetting' ;
@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.scss']
})
export class UserAppComponent extends BaseComponent<any>{
  title: string = 'management.user.title';
  titleOperation: string = 'management.user.titleOperation';
  apps: any;
  formPassword: any = {}
  passwordMismatch: boolean = false;
  loaderChangePassword: boolean = false;
  activeTab: Tabs = 'userData';

  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
    public baseService: UserService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
    modalService: NgbModal,
    cdr: ChangeDetectorRef,
    private router: Router,
    public authService: AuthService,
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
  loadentities() {
    this.ngxLoader.startLoader(searchLoader);
     this.baseService.getTeamWork(this.pagination).pipe( takeUntil(this.notifier)).subscribe(
      (res:any)=>{
        this.entities=res.result;
         this.pagination!.totalItems= res.pagination?.totalItems;
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
  assignRole(id:any) {

      this.router.navigateByUrl('/dashboard/management/users/assign-role/' + id);
  }
  EditModel(id:any) {

      this.router.navigateByUrl("/dashboard/management/users/edit/" + id);
  }
  register() {
    this.router.navigateByUrl("/dashboard/management/users/register");
  }
  repasswordChange() { // check password equal repassword
    this.formPassword.password == this.formPassword.repassword ? this.passwordMismatch = false : this.passwordMismatch = true
  }

  confirmChangePassword() {
    this.loaderChangePassword = true;
    this.ngxLoader.startLoader(this.operationLoader);
    let usersId = this.selectedRow[0].id;
    this.baseService.changePassword(usersId, this.formPassword)
      .pipe(takeUntil(this.notifier), delay(500)).subscribe(
        () => { this.alertService.success(); this.hideModel(); this.formPassword = {}; this.ngxLoader.stopLoader(this.operationLoader); },
        () => { this.alertService.error(); this.hideModel(); this.ngxLoader.stopLoader(this.operationLoader); }
      )
  }
  onUserLock(id:any) {
    this.ngxLoader.startLoader(this.searchLoader);
    let usersId = id;
    this.authService.userLock(usersId.toString())
      .pipe(takeUntil(this.notifier), delay(200)).subscribe(
        () => { this.alertService.success(); this.ngxLoader.stopLoader(this.searchLoader); },
        () => { this.alertService.error(); this.ngxLoader.stopLoader(this.searchLoader); }
      )
  }
  onUserUnLock(id:any) {
    this.ngxLoader.startLoader(this.searchLoader);
    let usersId = id;
    this.authService.userUnLock(usersId)
      .pipe(takeUntil(this.notifier), delay(200)).subscribe(
        () => { this.alertService.success(); this.ngxLoader.stopLoader(this.searchLoader); },
        () => { this.alertService.error(); this.ngxLoader.stopLoader(this.searchLoader); }
      )
  }
  hideModel(): void { // hide model
    this.modalRef?.hide();
    this.loaderChangePassword = false;
  }
  decline(): void {  // cancell || close model
    this.hideModel();
  }
  loginAs(id:any) {
    this.ngxLoader.startLoader(this.searchLoader);
    let usersId = id;
    this.authService.loginAs(usersId)
      .pipe(takeUntil(this.notifier), delay(200)).subscribe(
        (res: any) => {
          const user = res;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('tokenPer', user.tokenPermision);
            localStorage.setItem('user', JSON.stringify(user.user));
          }
          this.alertService.success();
          this.ngxLoader.stopLoader(this.searchLoader);
          location.assign("/");
          //  this.router.navigateByUrl('/', { skipLocationChange: false }) ;
        },
        () => { this.alertService.error(); this.ngxLoader.stopLoader(this.searchLoader); }
      )
  }
  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }



}

