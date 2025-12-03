import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wildcard-redirect',
  template: '' // no UI needed
})
export class redirectGuard implements OnInit {
  constructor(private auth: UserService, private router: Router) {}

  ngOnInit(): void {
    // Adjust these checks to match your AuthService API
    if (this.auth.isLoggedIn()) {
      // if you want to redirect to dashboard always:
      this.router.navigate(['/dashboard']);
      // or if you want to try to restore last known route:
      // this.router.navigateByUrl(this.auth.getLastVisited() || '/dashboard');
    } else {
      this.router.navigate(['/login']);
    }
  }
}
