import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserEditResolver } from '../management/resolvers/user-edit.resolver';
import { TeamEditResolver } from './resolvers/team-edit.resolver';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { ClaimAppOrgResolver } from '../management/resolvers/claim-app-org.resolver';
import { ClaimUserAppOrgResolver } from './resolvers/claim-user-app-org.resolver';

const routes: Routes = [

  {
    path: '',
    component: UserComponent, title: 'managementUser.user.title'
  },
  {
    path: 'team/register'
    , component: UserRegisterComponent,title: 'general.action.register',


  },
  {
    path: 'team/:id/permissions',
    resolve: { data: ClaimUserAppOrgResolver }, component: RolePermissionComponent, title: 'general.action.permissions'

  },
  {
    path: 'team/edit/:id',
    resolve: { data:TeamEditResolver },  component: UserRegisterComponent,title: 'general.action.edit'
 },
   { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementUserRoutingModule { }
