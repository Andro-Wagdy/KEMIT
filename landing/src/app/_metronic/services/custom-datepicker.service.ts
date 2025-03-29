import { Injectable } from '@angular/core';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
@Injectable( )
export class CustomDatepickerService  extends NgbDatepickerI18n {
  weekdays=['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		months= ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
		weekLabel= 'weekLabel';
  constructor(
    private translateService: TranslateService

  ) {
		super();
	}
  getWeekdayLabel(index: number): string {
    let result="";
    let weekDay="general.calender."+this.weekdays[index - 1];
    this.translateService.get(weekDay).subscribe((res: string) => {
      result= res;
    });
    return result;

	}
	getWeekLabel(): string {
	  return  this.weekLabel;

	}
	getMonthShortName(month: number): string {
    let result="";
    let weekDay="general.calender."+this.months[month - 1];
    this.translateService.get(weekDay).subscribe((res: string) => {
      result= res;
    });
    return result;
	}
	getMonthFullName(month: number): string {
		return this.getMonthShortName(month);
	}
	getDayAriaLabel(date: NgbDateStruct): string {
		return `${date.day}-${date.month}-${date.year}`;
	}
}
