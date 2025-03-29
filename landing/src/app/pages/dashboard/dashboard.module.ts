 import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
   import * as fromcomponents from './index';
  import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlert, NgbAlertModule, NgbCarousel, NgbDropdownModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownMenusModule, ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { LayoutModule } from 'src/app/_metronic/layout';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxEditorModule } from 'ngx-editor';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  declarations: [
    fromcomponents.components,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
    TableModule,
    TranslateModule,
    NgbPaginationModule,
    NgxUiLoaderModule,
    SharedModule,
    DropdownMenusModule,
    NgbDropdownModule,
    MultiSelectModule,
    NgbCarousel,
    NgbAlert,
    NgbModule
  ],
  providers: [DatePipe]

})
export class DashboardModule {}
