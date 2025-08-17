import { Component } from '@angular/core';
import { RouterLink,  RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
 
  selector: 'app-login',
  imports: [RouterLink , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 private loggedIn = false;
constructor(private router: Router, private userService: UserService){}

    email:string =''
    password: string = ''
  
  onLogin(){
    const isValid = this.userService.validateUser(this.email, this.password)
    console.log('Login attempt:', this.email, this.password);
    console.log('Is valid:', isValid);

      if(isValid){
        this.router.navigate(['dashboard']);
      }
      else{
        alert('Invalid username or password');
      }
    }
    isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  
    
  }

  }
 


