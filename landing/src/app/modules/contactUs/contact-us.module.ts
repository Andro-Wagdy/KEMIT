

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownMenusModule, ModalsModule, WidgetsModule } from 'src/app/_metronic/partials';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { LayoutModule } from 'src/app/_metronic/layout';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxEditorModule } from 'ngx-editor';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslationModule } from '../i18n';
 import { ContactUsAppComponent } from './components/contact-us-app/contact-us-app.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
@NgModule({
  declarations: [
    ContactUsAppComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    NgxUiLoaderModule,
    SharedModule,
    ReactiveFormsModule,
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
    NgxEditorModule,
    MultiSelectModule,
  ],
  providers: [DatePipe]

})
export class ContactUsModule { }
