import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {



    job:number=0;
    user:number=0;
    company:number=0;

    constructor(public global:GlobalService ,private router:Router) {
      this.startCounter('job', 1000);
      this.startCounter('user', 1500);
      this.startCounter('company', 1200);
    }
  
    startCounter(property: 'job' | 'user' | 'company', target: number) {
      let current = 0;
      const step = Math.ceil(target / 50);
      const interval = setInterval(() => {
        if (current < target) {
          current += step;
          this[property] = current > target ? target : current;
        } else {
          clearInterval(interval);
        }
      }, 30);
    }


    ngAfterViewInit() {
    const elements = document.querySelectorAll('.from-left, .from-right');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    elements.forEach(el => observer.observe(el));
  }

  // handleJob(){
  //   if(this.global.isLogin==true){
  //     this.router.navigateByUrl('/jobs')
  //   }
  //   else{
  //     this.router.navigateByUrl('/login')
  //   }
  // }

  goToSeekerForm() {
    this.router.navigate(['/seeker-form'], { state: { role: 'job_seeker' } });
  }

  goToEmployerForm() {
    this.router.navigate(['/employer-form'], { state: { role: 'employer' } });
  }
}

