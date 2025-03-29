 import { Component, Input, OnInit } from '@angular/core';

type Tabs =
  | 'kt_table_widget_5_tab_1'
  | 'kt_table_widget_5_tab_2'
  | 'kt_table_widget_5_tab_3';
@Component({
  selector: 'audit-app-view',
  templateUrl: './audit-app-view.component.html',
  styleUrls: ['./audit-app-view.component.scss']
})
export class AuditAppViewComponent  {
  constructor() {}
 @Input() form:any={};
 @Input() title:any="";

 @Input() changeEntity:any={}
  activeTab: Tabs = 'kt_table_widget_5_tab_1';

  setTab(tab: Tabs) {
    this.activeTab = tab;
  }

  activeClass(tab: Tabs) {
    return tab === this.activeTab ? 'show active' : '';
  }

}
