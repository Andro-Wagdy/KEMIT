import { ShardService } from 'src/app/_metronic/services/shard.service';
import { Component } from '@angular/core';
import { DashboardSetting } from 'src/app/modules/setting/models/dashboard-setting';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-join-to-us',
  templateUrl: './join-to-us.component.html',
  styleUrls: ['./join-to-us.component.scss']
})
export class JoinToUsComponent {
  dashboardSetting?:DashboardSetting;
  serverPath=environment.dashboardSettingMedia;

  constructor(
    private shardService:ShardService
  ) {
this.dashboardSetting=this.shardService.dashboardSetting;
  }

}
