import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { EmployeeComponent } from '../../employee/employee.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-dashboard',
  
  imports: [CommonModule , MatIconModule, EmployeeComponent, HeaderComponent],
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
