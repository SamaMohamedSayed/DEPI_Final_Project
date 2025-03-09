import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  @ViewChild('navbar') navbar!: ElementRef;
  navbarHeight = 0;

  ngAfterViewInit() {
    this.updateNavbarHeight();
  }

  toggleNavbar() {
    console.log("Toggle button clicked!");
    
    setTimeout(() => {
      this.updateNavbarHeight();
    }, 300); // ننتظر انتهاء الـ transition
  }

  updateNavbarHeight() {
    const navbarCollapse = this.navbar.nativeElement.querySelector('.navbar-collapse');

    if (!navbarCollapse) {
        console.log("❌ navbar-collapse not found!");
        return;
    }

    const isExpanded = navbarCollapse.classList.contains('show');
    console.log("✅ Navbar expanded:", isExpanded);
    console.log("📏 Navbar scrollHeight:", navbarCollapse.scrollHeight);

    this.navbarHeight = isExpanded ? navbarCollapse.scrollHeight : 0;
}


}
