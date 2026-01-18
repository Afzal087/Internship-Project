import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DialogService } from '../dialog-box/dialog-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dialog: DialogService, private userService: UserService, private router: Router) {}

  canActivate(): boolean {
  const loggedIn = this.userService.isLoggedIn();
  console.log('AuthGuard - isLoggedIn:', loggedIn);
  if (loggedIn) {
      return true;
  }
  this.dialog.show('Access denied. Please login first.');
    this.router.navigate(['/login']);
    return false;
}
}
