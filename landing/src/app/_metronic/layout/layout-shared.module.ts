
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule } from '@angular/router';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../../modules/i18n';
import { ExtrasModule } from '../partials/layout/extras/extras.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {
  DrawersModule,
  DropdownMenusModule,
  ModalsModule,
  EngagesModule,
} from '../partials';
import { ThemeModeModule } from '../partials/layout/theme-mode-switcher/theme-mode.module';
import {SharedModule} from "../shared/shared.module";
import * as fromcomponents from './components/index';
import { LayoutScrollTopComponent } from '../partials/layout/extras/scroll-top/scroll-top.component';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    fromcomponents.components,

  ],
  imports: [
    CommonModule,
    TranslationModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    ModalsModule,
    DrawersModule,
    EngagesModule,
    DropdownMenusModule,
    NgbTooltipModule,
    TranslateModule,
    ThemeModeModule,
    SharedModule,
    SidebarModule,
    RouterModule,
    FormsModule

  ],
  exports: [RouterModule,ToolbarComponent,LayoutScrollTopComponent, fromcomponents.components],
})
export class LayoutSharedModule {}
