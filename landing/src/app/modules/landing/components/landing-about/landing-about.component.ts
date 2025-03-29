import { Component } from '@angular/core';
import { fadeInUp } from 'ngx-animate/lib/fading';
import { transition, trigger, useAnimation } from '@angular/animations';
import { ShardService } from 'src/app/_metronic/services/shard.service';
import { DashboardSetting } from 'src/app/modules/setting/models/dashboard-setting';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'landing-about',
  templateUrl: './landing-about.component.html',
  styleUrls: ['./landing-about.component.scss'],
  // animations: [
  //   trigger('fadeUp', [transition('* => *', useAnimation(fadeInUp))])
  // ],
})
export class LandingAboutComponent {
  dashboardSetting?:DashboardSetting;
  serverPath=environment.dashboardSettingMedia;
  constructor(
    private shardService:ShardService
  ) {
this.dashboardSetting=this.shardService.dashboardSetting;
  }
}
