import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isOpen = false;

  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }


  closeMenuOnNavigation() {
    this.isOpen = false;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeMenuOnNavigation();
  }
}
