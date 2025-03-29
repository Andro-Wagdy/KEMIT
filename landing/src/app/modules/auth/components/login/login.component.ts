import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { delay, dematerialize, finalize, first, materialize, take, takeUntil } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { LanguageChangeService } from 'src/app/_metronic/services/language-change.service';
import { ShardService } from 'src/app/_metronic/services/shard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  hasError: boolean=false;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  languges:any=[];
  icon:string='us';
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private  translateService: TranslateService,
    private ngxService: NgxUiLoaderService,
    private alertService:AlertService,
    private cdr: ChangeDetectorRef,
    private shardService:ShardService ,
    private languageChangeService:LanguageChangeService





  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.languges=this.shardService.languges;
    let lang=this.shardService.languges.filter((e:any)=>{e.isDefault==true})[0];
    this.icon=lang?  lang.icon: this.icon;
  }
  onLanguageSelected(select:any){
    let lang=JSON.parse( select.target.value);
    this.icon=lang?  lang.icon: this.icon;
    this.languageChangeService.changeLanguae(lang);
}
  getTranslationText(text: any) {
    let result = '';
    this.translateService.get(text).subscribe((res: string) => {
      result = res;
      this.cdr.detectChanges();
    },
    (err)=>{}
    )
    return result;
  }

  ngOnInit(): void {

    this.initForm();
    this.returnUrl =  this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: ['',[Validators.required]],
       password: ['',Validators.required],
    });
  }

  submit() {
    this.ngxService.startLoader("loginLoaderId");

    this.hasError = false;
    let model=this.loginForm.value;
    const loginSubscr =    this.authService .login(model)
      .pipe(
        materialize(),
        delay(400),
        dematerialize(),
        finalize(
          () =>  this.ngxService.stopLoader("loginLoaderId")),
        take(1)
      )
      .subscribe(
       ()=>{window.location.href="/dashboard/home"},
       (err)=>{console.log(err); this.alertService.error(err)}
      );
    this.unsubscribe.push(loginSubscr);


  }
  getAuthFromLocalStorage(){

  }
  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
  goRegister(){

    this.router.navigateByUrl('/auth/registration', {skipLocationChange: false}).then(() => {
      this.router.navigate(["/auth/registration"]);
  });
  }
}
