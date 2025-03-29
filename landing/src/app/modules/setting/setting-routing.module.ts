import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSettingComponent } from './components/dashboard-setting/dashboard-setting.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardSettingComponent,
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
