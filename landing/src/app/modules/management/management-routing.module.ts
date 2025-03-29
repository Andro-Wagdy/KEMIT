import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditResolver } from './resolvers/user-edit.resolver';
import {
  LanguageComponent,
  LanguageKeyComponent,
  LanguageTextComponent,
  ModuleAppComponent,
  RolesComponent,
  ScreenAppComponent,
  UserAppComponent,
  UserRegisterComponent,
} from './services';
import { AuditAppComponent } from './components/audit-app/audit-app.component';
import { ClaimAppOrgResolver } from './resolvers/claim-app-org.resolver';
import { RolePermissionComponent } from './components/role-permission/role-permission.component';
import { ClaimAppComponent } from './components/claim-app/claim-app.component';

const routes: Routes = [
  {
    path: 'roles',
    component: RolesComponent,
    data: {
      key: 'management.role.title',
      permission: ['permission.manageroles.view'],
    },
  },
  {
    path: 'roles/:id/permissions',
    resolve: { data: ClaimAppOrgResolver },
    component: RolePermissionComponent,
    data: {
      key: 'general.action.permissions',
    },
  },
  {
    path: 'users',
    component: UserAppComponent,
    data: {
      key: 'management.user.title',
      permission: ['permission.manageusers.view'],
    },
  },
  {
    path: 'users/register',
    component: UserRegisterComponent,
    data: {
      key: 'general.action.register',
      permission: ['permission.users.register'],
    },
  },
  {
    path: 'users/edit/:id',
    resolve: { data: UserEditResolver },
    component: UserRegisterComponent,
    data: {
      key: 'general.action.edit',
      permission: ['permission.users.edit'],
    },
  },

  {
    path: 'modules',
    component: ModuleAppComponent,
    data: {
      key: 'management.moduleApp.title',
      permission: ['permission.managemodule.view'],
    },
  },
  {
    path: 'permissions',
    component: ClaimAppComponent,
    data: {
      key: 'management.claimApp.title',
      permission: ['permission.managepermissions.view'],
    },
  },
  {
    path: 'screens',
    component: ScreenAppComponent,
    data: {
      key: 'management.screenApp.title',
      permission: ['permission.managescreens.view'],
    },
  },
  {
    path: 'audit-logs',
    component: AuditAppComponent,
    data: {
      key: 'management.auditApp.title',
      permission: ['permission.manageaudits.view'],
    },
  },
  {
    path: 'languages',
    component: LanguageComponent,
    data: {
      key: 'management.language.title',
      permission: ['permission.managelanguages.view'],
    },
  },
  {
    path: 'languages-key',
    component: LanguageKeyComponent,
    data: {
      key: 'management.languageKey.title',
      permission: ['permission.managelanguagekey.view'],
    },
  },
  {
    path: 'language/:id/texts',
    component: LanguageTextComponent,
    data: {
      key: 'management.languageText.title',
      permission: ['permission.language.changeText'],
    },
  },
  // {   path: 'user-analysis',  component: UserAnalysisComponent , title: 'management.languageText.title'  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
