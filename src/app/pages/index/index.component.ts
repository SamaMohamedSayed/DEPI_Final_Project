import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  
  governorates: string[] = [
    'Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Suez', 
    'Port Said', 'Ismailia', 'Fayoum', 'Beni Suef', 'Minya', 
    'Sohag', 'Qena', 'Assiut', 'Red Sea', 'Sharqia', 'Dakahlia', 
    'Beheira', 'Kafr El Sheikh', 'Gharbia', 'Monufia', 'Matrouh'
  ]

    job:number=0;
    user:number=0;
    company:number=0;

    constructor() {
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

    
}

