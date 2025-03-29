import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) { }
  success(msg: string = "general.message.successProccess"): void {
    this.translateService.get(msg).subscribe((res: string) => {
      this.toastrService.success(res);

    });
  }

  error(msg: string = "general.message.failProccess") {
    this.translateService.get(msg).subscribe((res: string) => {
      this.toastrService.error(res);

    },
      () => { this.toastrService.error(msg) }

    );
  }
  errorNoTranslate(msg: string = "general.message.failProccess") {
    this.toastrService.error(msg);

  }

  info(msg: string) {
    this.translateService.get(msg).subscribe((res: string) => {
      this.toastrService.info(res);

    });
  }
  confirm(msg: string): Observable<boolean> {
    let msgtrans = msg;
    this.translateService.get(msg).subscribe((res: string) => {
      msgtrans = res;
    });
    return of(confirm(msgtrans));
    ;
  }
}
