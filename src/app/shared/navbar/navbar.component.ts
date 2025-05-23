import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public global:GlobalService){}
  
  @ViewChild('navbar') navbar!: ElementRef;
  navbarHeight = 0;

  ngAfterViewInit() {
    this.updateNavbarHeight();
  }

  toggleNavbar() {
    console.log("Toggle button clicked!");
    
    setTimeout(() => {
      this.updateNavbarHeight();
    }, 300); 
  }

  updateNavbarHeight() {
    const navbarCollapse = this.navbar.nativeElement.querySelector('.navbar-collapse');

    const isExpanded = navbarCollapse.classList.contains('show');


    this.navbarHeight = isExpanded ? navbarCollapse.scrollHeight : 0;
}


}
