import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ProjectComponent } from './components/project/project.component';


const routes: Routes = [{path: 'adduser', component: UserComponent },
{path: '', component: ProjectComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
