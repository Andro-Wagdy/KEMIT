import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent, ProjectOperationComponent } from './components';

const routes: Routes = [
  {
    path: 'entities-projects',
    component: ProjectListComponent,
    data: {
      key: 'project.project.title',
      // permission: ['permission.project.view'],
    },
  },
  {
    path: 'entities-projects/register',
    component: ProjectOperationComponent,
    data: {
      key: 'project.project.title',
      // permission: ['permission.project.view'],
    },
  },
  {
    path: 'entities-projects/edit/:id',
    component: ProjectOperationComponent,
    data: {
      key: 'project.project.title',
      // permission: ['permission.project.view'],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
