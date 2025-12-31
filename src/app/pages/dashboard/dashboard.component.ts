import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { EmployeeComponent } from '../../employee/employee.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  
import { HomeComponent } from '../../home/home.component';



import { EmployeeListComponent } from '../../employee/employee-list/employee-list.component';
import { FieldsComponent } from '../../fields/fields.component';
import { AssignmentService } from '../../services/assignment.service';
import { EmployeeService } from '../../services/employee.service';
import { DialogService } from '../../dialog-box/dialog-service.service';
import { LeaveComponent } from '../../LTA/leave.component';
import { ManageLeaveComponent } from '../../manage-leave/manage-leave.component';



@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule , MatIconModule, RouterLink, RouterOutlet, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private dialog: DialogService, private userService: UserService ,private employeeService : EmployeeService,private service: AssignmentService, private router : Router){}

  activeComponents : string  = 'home';

  componentMap : Record<string,any> ={
      home: HomeComponent,
      employees: EmployeeListComponent,
      employeeProfile: EmployeeComponent,
      fields : FieldsComponent,
      leave : LeaveComponent,
      leaves: ManageLeaveComponent,
  };


  ngOnInit(): void {
    this.service.getAllDepartments().subscribe();
    this.service.getAllOrganizations().subscribe();
    this.service.getAllProjects().subscribe();
    this.employeeService.getEmployee().subscribe();
  }
  loadComponent(name: string){ 
      this.activeComponents = name;
  }


  logout() {
    this.userService.logout();
    this.dialog.show('You have been logged out');
    this.router.navigate(['']);
  }

}
