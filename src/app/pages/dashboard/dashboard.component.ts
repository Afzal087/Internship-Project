import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,MatIconModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private userService: UserService , private router : Router){}

  logout() {
    this.userService.logout();
    alert('You have been logged out');
    this.router.navigate(['']);
  }

}
