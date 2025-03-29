import { ContactUsModule } from './../modules/contactUs/contact-us.module';
import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard';

const Routing: Routes = [
  // {
  //   path: 'store',
  //   loadChildren: () =>
  //     import('../modules/store/store.module').then((m) => m.StoreModule),
  // },
  {
    path: '',
    canActivate: [AuthGuard],

    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],

    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'security',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/mangment-user/management-user.module').then((m) => m.ManagementUserModule),
  },
  {
    path: 'management',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/management/management.module').then((m) => m.ManagementModule),

  },
  {
    path: 'contact-us',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/contactUs/contact-us.module').then((m) => m.ContactUsModule),
  },
  {
    path: 'setting',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../modules/setting/setting.module').then((m) => m.SettingModule),
  },
  // {
  //   path: 'builder',
  //   loadChildren: () =>
  //     import('./builder/builder.module').then((m) => m.BuilderModule),
  // },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),

  },
  // {
  //   path: 'account',
  //   loadChildren: () =>
  //     import('../modules/account/account.module').then((m) => m.AccountModule),

  // },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),

  },
  // {
  //   path: 'crafted/widgets',
  //   loadChildren: () =>
  //     import('../modules/widgets-examples/widgets-examples.module').then(
  //       (m) => m.WidgetsExamplesModule
  //     ),

  // },
  // {
  //   path: 'apps/chat',
  //   loadChildren: () =>
  //     import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  //   data: { layout: 'light-sidebar' },
  // },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
