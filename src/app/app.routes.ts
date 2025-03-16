import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './pages/login/login.component';
const authGuard=() =>{
    const cookieService=inject(CookieService);
    return !!cookieService.get('auth_token') || '/login';

}
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
  { path: 'tasks', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
