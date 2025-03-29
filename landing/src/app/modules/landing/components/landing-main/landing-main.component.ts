import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { bounceInRight } from 'ngx-animate/lib/bouncing';
import { fadeInLeft, fadeInRight, fadeInUp } from 'ngx-animate/lib/fading'
import { ShardService } from 'src/app/_metronic/services/shard.service';
import { DashboardSetting } from 'src/app/modules/setting/models/dashboard-setting';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'landing-main',
  templateUrl: './landing-main.component.html',
  styleUrls: ['./landing-main.component.scss'],
  // animations: [
  //   trigger('fadeRight', [transition('* => *', useAnimation(fadeInRight))]),
  //   trigger('fadeLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  //   trigger('fadeUp', [transition('* => *', useAnimation(fadeInUp))]),
  // ],
})
export class LandingMainComponent implements OnInit {
  bounce: any;
  dashboardSetting?:DashboardSetting;
  serverPath=environment.dashboardSettingMedia;
  constructor(
    private shardService:ShardService,
  private cdr: ChangeDetectorRef

  ) {
this.dashboardSetting=this.shardService.dashboardSetting;
  }
  ngOnInit(): void {
    this.cdr.detectChanges();

  }
}
