import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
 // import * as fromcomponents from './components/index';

import { TranslateModule } from '@ngx-translate/core';
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
 import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbHighlight, NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownMenusModule, ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { LayoutModule } from 'src/app/_metronic/layout';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
 import { LayoutSharedModule } from 'src/app/_metronic/layout/layout-shared.module';
import { ManagementUserRoutingModule } from './management-user-routing.module';
import { UserComponent } from './user/user.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
@NgModule({
  declarations: [
    UserComponent,
    UserRegisterComponent,
    RolePermissionComponent
  ],
  imports: [
    CommonModule,
    ManagementUserRoutingModule,
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
    // LayoutSharedModule,
    NgbAccordionModule

  ],
  providers: [
    DatePipe,
    UpperCasePipe,
  ],
})
export class ManagementUserModule { }
