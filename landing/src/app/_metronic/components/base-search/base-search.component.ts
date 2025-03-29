import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'base-search',
  templateUrl: './base-search.component.html',
  styleUrls: ['./base-search.component.scss']
})
export class BaseSearchComponent {
  animation: any;
  setting: boolean = false;
  categories: any = [];
  lang: string = "ar";
  notifier = new Subject();  // valiable destory
  @Input() form: any = {};                  // form gurd
  @Output() OnSearch = new EventEmitter<any>();         // output create  Change
  @Output() OnReset = new EventEmitter<any>();         // output create  Change
  @Output() OnPrint = new EventEmitter<any>();         // output create  Change

   @Input() showOption: any = false;
  @Input() showFingerNumber: boolean = true;
  @Input() showNationalNumber: boolean = true;
  @Input() showSettingReport: boolean = false;
  @Input() showSearchMore: boolean = false;
  @Input() showReportType: boolean = true;
  @Input() showCategory: boolean = true;
  @Input() showDateTime: boolean = true;
  idSelected:string="";

  active=1;
  OnSubmit() {
    this.OnSearch.emit(this.form);
  }

  onReset() {
    this.form = {};
    this.OnReset.emit(true);

  }
  onSettings() {
    this.setting = !this.setting;
  }
  onPrint() {
    this.OnPrint.emit(this.form);

  }
}
