import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}

  email: string = '';
  password: string = '';

  onLogin(form: any) {
    if (form.invalid) {
      if (form.controls.email?.errors?.['required']) {
        alert('Email is required');
      } else if (form.controls.email?.errors?.['email']) {
        alert('Invalid email format');
      }
      if (form.controls.password?.errors?.['required']) {
        alert('Password is required');
      } else if (form.controls.password?.errors?.['minlength']) {
        alert('Password must be at least 8 characters long');
      }
    } else {
      this.userService.login(this.email, this.password).subscribe({
        next: (success) => {
          if (success) {
            console.log('✅ Login successful');
            this.userService.setLoginStatus(true);
            this.router.navigate(['dashboard']);
            // redirect to dashboard
          } else {
            console.log('❌ Invalid credentials');
            this.userService.setLoginStatus(false);
          }
        },
        error: (err) => {
          if (err.status === 401) {
            alert('🚫 ' + err.error.message);
          } else {
            alert('❌ Something went wrong. Try again later.');
          }
        },
      });
    }
  }

  clicked() {
    alert('Google sign-in clicked');
    console.log('Google sign-in clicked');
  }
}
