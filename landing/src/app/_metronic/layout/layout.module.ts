import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { Routing } from '../../pages/routing';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutSharedModule } from './layout-shared.module';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];

@NgModule({
  imports: [
    LayoutSharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule,ToolbarComponent,LayoutSharedModule],
})
export class LayoutModule {}
