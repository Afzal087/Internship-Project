import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService: UserService){}

  userValue: any = {
    username:'',
    email: '',
    password: ''
  }

  onSign() {
    this.userService.addUser(this.userValue.username, this.userValue.password, this.userValue.email)
    console.log(this.userValue);
    console.log('All users:', this.userService.getUsers());
    }

 
}
