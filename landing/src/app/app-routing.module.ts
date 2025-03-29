import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/services/auth.guard';
import { UserTokenResolver } from './_metronic/resolvers/user-token.resolver';
import { AuthMainGuard } from './modules/auth/services/auth-main.guard';

export const routes: Routes = [
  {
    path: '',

    loadChildren: () =>
      import('./modules/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'marketer',
    loadChildren: () =>
      import('./modules/landing-marketer/landing-marketer.module').then((m) => m.LandingMarketerModule),
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./modules/landing-seller/landing-seller.module').then((m) => m.LandingSellerModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: 'dashboard',
    resolve: { data: UserTokenResolver },
    canActivate: [AuthMainGuard],
    loadChildren: () =>
      import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
  },
  // {
  //   path: ':id',
  //   resolve: { data: LandingInfoResolver },

  //   loadChildren: () =>
  //   import('./modules/store/layout-store.module').then((m) => m.LayoutStoreModule),
  // },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
