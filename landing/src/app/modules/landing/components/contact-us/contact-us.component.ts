
import { trigger, transition, useAnimation } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { fadeInRight, fadeInLeft, fadeInUp, fadeIn, fadeInDown } from 'ngx-animate/lib/fading';
import { Subject, catchError, delay, dematerialize, finalize, materialize, takeUntil, throwError } from 'rxjs';
import { operationLoader } from 'src/app/_metronic/models/shard-string';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { ShardService } from 'src/app/_metronic/services/shard.service';
import { ContactUsAppService } from 'src/app/modules/contactUs/services/contact-us-app.service';
import { DashboardSetting } from 'src/app/modules/setting/models/dashboard-setting';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  // animations: [
  //   trigger('fadeRight', [transition('* => *', useAnimation(fadeInRight))]),
  //   trigger('fadeLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  //   trigger('fadeUp', [transition('* => *', useAnimation(fadeInUp))]),
  //   trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))]),
  //   trigger('fadeDown', [transition('* => *', useAnimation(fadeInDown))]),
  // ],
})
export class ContactUsComponent implements OnInit {

  form:any={};
  isLoad=false;
  mainDelay=300;
  notifier = new Subject<void>(); // valiable destory
  isSuccess=false;
  isError=false;
  dashboardSetting?:DashboardSetting;
  serverPath=environment.dashboardSettingMedia;
constructor(
  private baseService: ContactUsAppService,
  private cdr: ChangeDetectorRef,
  private shardService:ShardService,

) {
  this.dashboardSetting=this.shardService.dashboardSetting;

}
  ngOnInit(): void {
     this.cdr.detectChanges();
  }


  OnSubmit() {  // register entity
    this.isLoad=true;
    this.cdr.detectChanges();
    this.baseService
      .registerLanding(this.form)
      .pipe(
        materialize(),
        delay(this.mainDelay),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() =>this.isLoad=false  ),
      )
      .subscribe(
        () => {
          this.isSuccess=true;
          this.isError=false;
          this.isLoad=false;
          this.form={};
          this.removeStatus();
          this.cdr.detectChanges();
        },
        (err) => {
          this.isSuccess=true;
          this.isError=false;
          this.isLoad=false;
          this.removeStatus();
          this.cdr.detectChanges();
        }
      );
  }
  removeStatus(){
    setTimeout( ()=>{
      this.isSuccess=false;
      this.isError=false;
      this.cdr.detectChanges();

    }, 10000);
  }

}
