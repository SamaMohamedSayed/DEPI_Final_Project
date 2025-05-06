import { Component } from '@angular/core';

@Component({
  selector: 'app-av-jobs',
  standalone: false,
  templateUrl: './av-jobs.component.html',
  styleUrl: './av-jobs.component.css'
})
export class AvJobsComponent {
  jobs=[
    {
      id:1,
      title:'Frontend'
    },
    {
      id:2,
      title:'Backend'
    },
    {
      id:3,
      title:'Ai'
    },
    {
      id:4,
      title:'Data Analysis'
    },
    {
      id:5,
      title:'Angular'
    },
    {
      id:6,
      title:'React'
    },
    {
      id:7,
      title:'Testing'
    },
    {
      id:8,
      title:'UI/UX'
    },
  ]

  pageSize=5
  p=1
  total=this.jobs.length
  pageChanged(e:any){
    this.p=e
  }
}
