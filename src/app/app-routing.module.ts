import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { MultiFormComponent } from './pages/multi-form/multi-form.component';

const routes: Routes = [
  {path:'',component:IndexComponent},
  { path: 'register', component: MultiFormComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
