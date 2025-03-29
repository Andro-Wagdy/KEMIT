import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketerLayoutComponent } from './components/marketer-layout/marketer-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MarketerLayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingMarketerRoutingModule { }
