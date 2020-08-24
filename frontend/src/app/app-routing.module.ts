import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { PrivateTasksComponent } from './componenets/private-tasks/private-tasks.component';
import { SigninComponent } from './componenets/signin/signin.component';
import { SignupComponent } from './componenets/signup/signup.component';

import { AuthGuard } from './auth.guard';
import { TasksComponent } from './componenets/tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'private',
    component: PrivateTasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
