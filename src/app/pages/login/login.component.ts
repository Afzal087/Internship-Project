import { Component } from '@angular/core';
import { RouterLink,  RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { error } from 'console';


@Component({ 
  selector: 'app-login',
  imports: [RouterLink , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private router: Router, private userService: UserService){}

    email:string =''
    password: string = ''
  

  onLogin() {
  this.userService.login(this.email, this.password).subscribe({
    next: (success) => {
      if (success) {
        console.log("✅ Login successful");
        this.userService.setLoginStatus(true);
        this.router.navigate(['dashboard']);
        // redirect to dashboard
      } else {
        console.log("❌ Invalid credentials");
        this.userService.setLoginStatus(false);
       
      }
    },
    error: (err) => {
      console.error("⚠️ Server error:", err);
    }
  });
}



clicked(){
  alert("Google sign-in clicked");
  console.log("Google sign-in clicked");
}

  }
 


