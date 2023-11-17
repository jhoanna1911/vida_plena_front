import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth-service.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/login', title: 'Login',  icon: 'person', class: '' },
    { path: '/noticias', title: 'Noticias',  icon: 'dashboard', class: '' },
    { path: '/servicios', title: 'Servicios',  icon:'shopping_cart', class: '' },
    { path: '/actividades', title: 'Actividades',  icon:'settings_accessibility', class: '' },
    { path: '/eps', title: 'Mi eps',  icon:'medical_services', class: '' },
    { path: '/encuesta', title: 'Encuesta',  icon:'assignment', class: '' },
    { path: '/estadisticas', title: 'Estadisticas',  icon:'bar_chart', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  habilitarMenu: boolean;

  constructor(private authService: AuthService,
    private router: Router) { }

    ngOnInit() {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.habilitarMenu = isLoggedIn;
      });
    }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  isActivePath(path: string): boolean {
    return this.router.isActive(path, false); 
  }
}
