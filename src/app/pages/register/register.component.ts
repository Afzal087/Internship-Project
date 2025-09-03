import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model'
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router) { }

  userValue: User = {
    name: '',
    email: '',
    password: ''
  }


  onSign(form: any) {
    if (form.invalid) {
      if (form.controls.email?.errors?.['required']) {
        alert("Email is required");
      }
      else if (form.controls.email?.errors?.['email']) {
        alert("Invalid email format");
      }
      if (form.controls.password?.errors?.['required']) {
      alert("Password is required");
    }
    else if (form.controls.password?.errors?.['minlength']) {
      alert("Password must be at least 8 characters long");
    }
    }
    else {
      this.userService.register(this.userValue).subscribe({
        next: (registered) => {
          alert('User Registration successful Please Login',);
          this.router.navigate(['']);
        },
        error: (err:HttpErrorResponse) =>{
          
          if (err.status === 409) {
            alert('🚫' + err.error.message);
          } else {
            alert('❌ Something went wrong. Try again later.');
          }
        } 
      })
    }
  }

}
