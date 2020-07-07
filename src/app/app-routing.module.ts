import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';


const routes: Routes = [{path: 'adduser', component: UserComponent },
{path: '', component: ProjectComponent },
{ path: 'addTask', component: AddTaskComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
