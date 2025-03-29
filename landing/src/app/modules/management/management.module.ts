import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
// import * as fromcomponents from './components/index';

import { TranslateModule } from '@ngx-translate/core';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
 import * as fromcomponents from './services/index';
import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbHighlight, NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownMenusModule, ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { LayoutModule } from 'src/app/_metronic/layout';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RolePermissionComponent } from './components/role-permission/role-permission.component';
import { LayoutSharedModule } from 'src/app/_metronic/layout/layout-shared.module';
import { ClaimAppComponent } from './components/claim-app/claim-app.component';

     @NgModule({
  declarations: [
fromcomponents.components,


  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
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
    NgbAccordionModule


  ],
  providers: [
    DatePipe,
    UpperCasePipe,
  ],
})
export class ManagementModule { }
