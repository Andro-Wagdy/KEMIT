import { Component } from '@angular/core';
import { fadeIn, fadeInDown, fadeInLeft, fadeInRight, fadeInUp } from 'ngx-animate/lib/fading';
import { transition, trigger, useAnimation } from '@angular/animations';
import { ShardService } from 'src/app/_metronic/services/shard.service';
import { DashboardSetting } from 'src/app/modules/setting/models/dashboard-setting';


@Component({
  selector: 'landing-service',
  templateUrl: './landing-service.component.html',
  styleUrls: ['./landing-service.component.scss'],
  // animations: [
  //   trigger('fadeRight', [transition('* => *', useAnimation(fadeInRight))]),
  //   trigger('fadeLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  //   trigger('fadeUp', [transition('* => *', useAnimation(fadeInUp))]),
  //   trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))]),
  //   trigger('fadeDown', [transition('* => *', useAnimation(fadeInDown))]),
  // ],
})
export class LandingServiceComponent {
  dashboardSetting?:DashboardSetting;
  constructor(
    private shardService:ShardService
  ) {
this.dashboardSetting=this.shardService.dashboardSetting;
  }
}
