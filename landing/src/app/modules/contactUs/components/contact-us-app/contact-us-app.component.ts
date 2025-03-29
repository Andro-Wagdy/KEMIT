import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { ContactUsAppService } from '../../services/contact-us-app.service';
import { ContactUsApp } from '../../models/contact-us-app';
@Component({
  selector: 'app-contact-us-app',
  templateUrl: './contact-us-app.component.html',
  styleUrls: ['./contact-us-app.component.scss']
})
export class ContactUsAppComponent  extends BaseComponent<ContactUsApp>{
  title: string = 'support.contactUs.title';
  titleOperation: string = 'support.contactUs.titleOperation';
  form: any = {};
  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
    public baseService: ContactUsAppService,
    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
    modalService: NgbModal,
    cdr: ChangeDetectorRef
  ) {
    super(
      routerActive,
      translateService,
      modalService,
      baseService,
      alertService,
      datePipe,
      loader,
      cdr
    );

  }
}

