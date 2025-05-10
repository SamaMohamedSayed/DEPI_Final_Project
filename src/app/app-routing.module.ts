import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { MultiFormComponent } from './app/multi-form/multi-form.component';
import { LoginformComponent } from './pages/loginform/loginform.component';

const routes: Routes = [
  { path: '', component:IndexComponent },
  { path: 'seeker-form', component: MultiFormComponent },
  { path: 'login', component: LoginformComponent},
  { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
