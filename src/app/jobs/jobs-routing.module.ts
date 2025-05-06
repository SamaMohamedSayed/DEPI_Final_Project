import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs.component';
import { AvJobsComponent } from './pages/av-jobs/av-jobs.component';
import { SavedJobsComponent } from './pages/saved-jobs/saved-jobs.component';

const routes: Routes = [{ path: '', component: JobsComponent ,children:[
  {path:'',component:AvJobsComponent},
  {path:'saved-jobs',component:SavedJobsComponent}

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
