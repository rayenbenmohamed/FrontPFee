// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser() && this.authService.isAdminUser()) {
      return true;
    } else if (this.authService.isAuthenticatedUser() && !this.authService.isFormateur()) {
      this.router.navigate(['/formateurprofile']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
