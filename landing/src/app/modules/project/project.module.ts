import { CommonModule } from '@angular/common';
import * as fromcomponents from './components/index';
import { NgModule } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDropdownModule,
  NgbHighlight,
  NgbPagination,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import {
  DropdownMenusModule,
  ModalsModule,
  WidgetsModule,
} from 'src/app/_metronic/partials';
import { LayoutModule } from 'src/app/_metronic/layout';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LayoutSharedModule } from 'src/app/_metronic/layout/layout-shared.module';
import { ProjectRoutingModule } from './project-routing.module';
@NgModule({
  declarations: [fromcomponents.components],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    NgbHighlight,
    NgbPagination,
    TableModule,
    TranslateModule,
    NgbPaginationModule,
    ModalsModule,
    FormsModule,
    NgxUiLoaderModule,
    SharedModule,
    LayoutModule,
    NgMultiSelectDropDownModule.forRoot(),
    WidgetsModule,
    DropdownMenusModule,
    NgbDropdownModule,
    NgbAlertModule,
    LayoutSharedModule,
    NgbAccordionModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [DatePipe, UpperCasePipe],
})
export class ProjectModule {}
