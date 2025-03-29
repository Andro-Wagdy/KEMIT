import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerLayoutComponent } from './components/seller-layout/seller-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingSellerRoutingModule { }
