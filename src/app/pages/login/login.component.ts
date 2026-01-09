import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../dialog-box/dialog-service.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private dialog: DialogService,private router: Router, private userService: UserService) {}

  email: string = '';
  password: string = '';

  onLogin(form: any) {
    if (form.invalid) {
      if (form.controls.email?.errors?.['required']) {
        this.dialog.show('Email is required');
      } else if (form.controls.email?.errors?.['email']) {
        this.dialog.show('Invalid email format');
      }
      if (form.controls.password?.errors?.['required']) {
        this.dialog.show('Password is required');
      } else if (form.controls.password?.errors?.['minlength']) {
        this.dialog.show('Password must be at least 8 characters long');
      }
    } else {

      this.userService.login(this.email, this.password).subscribe({
        next: (success:any) => {
          if (success) {
            this.userService.setSessionData(success.role, success.userId);
            console.log(success);
            this.userService.setLoginStatus(true);
            this.router.navigate(['dashboard']);
            
          } else {
            console.log('Invalid credentials');
            this.userService.setLoginStatus(false);
          }
        },
        
        error: (err) => {
          if (err.status === 401) {
            this.dialog.show(' ' + err.error.message);
          } else {
            this.dialog.show('Something went wrong. Try again later.');
          }
        },
      });
    }
  }

  forgotPassword() {
   this.router.navigate(['/forgot']);
  }
}
