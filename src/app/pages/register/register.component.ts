import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService, private router: Router) { }

  userValue: any = {
    name: '',
    email: '',
    password: ''
  }

  onSign() {
    this.userService.register(this.userValue.name, this.userValue.email, this.userValue.password)
      .subscribe({
        next: (res: any) => {
          if (res && res.success) {
            alert('Registration successful!');
            this.router.navigate(['/login']);
          } else {
            alert(res.message || 'Registration failed');
          }
        },
        error: () => {
          alert('Registration failed. Please try again.');
        }
      });
  }
}
