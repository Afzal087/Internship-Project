import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import {User} from '../../models/user.model'

@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule],
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


  onSign() {
    this.userService.register(this.userValue).subscribe({
      next: (registered) => {
        alert('User Registration successful Please Login', );
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Error during registration:', err)
    })
    
  }
}
