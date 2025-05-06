import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import { AvJobsComponent } from './pages/av-jobs/av-jobs.component';
import { SavedJobsComponent } from './pages/saved-jobs/saved-jobs.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    JobsComponent,
    AvJobsComponent,
    SavedJobsComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    NgxPaginationModule
  ]
})
export class JobsModule { }
