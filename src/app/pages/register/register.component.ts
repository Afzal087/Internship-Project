import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model'
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../dialog-box/dialog-service.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private dialog: DialogService,private userService: UserService, private router: Router) { }

  userValue: User = {
    name: '',
    email: '',
    password: ''
  }


  onSign(form: any) {
    if (form.invalid) {
      if (form.controls.email?.errors?.['required']) {
        this.dialog.show("Email is required");
      }
      else if (form.controls.email?.errors?.['email']) {
        this.dialog.show("Invalid email format");
      }
      if (form.controls.password?.errors?.['required']) {
      this.dialog.show("Password is required");
    }
    else if (form.controls.password?.errors?.['minlength']) {
      this.dialog.show("Password must be at least 8 characters long");
    }
    }
    else {
      this.userService.register(this.userValue).subscribe({
        next: (registered) => {
          this.dialog.show('User Registration successful Please Login',);
          this.router.navigate(['']);
        },
        error: (err:HttpErrorResponse) =>{
          
          if (err.status === 409) {
            this.dialog.show('🚫' + err.error.message);
          } else {
            this.dialog.show('❌ Something went wrong. Try again later.');
          }
        } 
      })
    }
  }

}
