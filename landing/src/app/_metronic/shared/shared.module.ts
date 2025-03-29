import {NgModule} from '@angular/core';
import {KeeniconComponent} from './keenicon/keenicon.component';
import {CommonModule} from "@angular/common";
import { BaseComponent } from '../components/base/base.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchSimpleComponent } from '../components/search-simple/search-simple.component';
import { DeleteModalComponent } from '../components/delete-modal/delete-modal.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { NgbPaginationInfoComponent } from '../components/ngb-pagination-info/ngb-pagination-info.component';
import { TableLengthComponent } from '../components/table-length/table-length.component';
import { BaseSearchComponent } from '../components/base-search/base-search.component';
import { DropdownMenuActionComponent } from '../components/dropdown-menu-action/dropdown-menu-action.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import * as fromdirectives from '../directives/index';
import * as fromPipes from '../pipes/index';
import { SwitchLanguageComponent } from '../components/switch-language/switch-language.component';
import { FooterComponent } from '../layout/components';
import { LandingFooterComponent } from '../components/landing-footer/landing-footer.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    KeeniconComponent,
    BaseComponent,
    SearchSimpleComponent,
    DeleteModalComponent,
    NgbPaginationInfoComponent,
    TableLengthComponent,
    BaseSearchComponent,
    DropdownMenuActionComponent,
    fromdirectives.directives,
    fromPipes.pipes,
    SwitchLanguageComponent,
    LandingFooterComponent

   ],
  imports: [
    CommonModule,
    TranslateModule,
    NgxUiLoaderModule,
    FormsModule,
    NgbDropdownModule
  ],
  exports: [
    KeeniconComponent,
    BaseComponent,
    SearchSimpleComponent,
    DeleteModalComponent,
    NgbPaginationInfoComponent,
    TableLengthComponent,
    BaseSearchComponent,
    DropdownMenuActionComponent,
    MultiSelectModule,
    fromdirectives.directives,
    fromPipes.pipes,
    SwitchLanguageComponent,
    LandingFooterComponent

  ]
})
export class SharedModule {
}
