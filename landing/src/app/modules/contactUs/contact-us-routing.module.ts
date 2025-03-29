import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsAppComponent } from './components/contact-us-app/contact-us-app.component';

const routes: Routes = [
  {
    path: '',
    component: ContactUsAppComponent,
  },
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
