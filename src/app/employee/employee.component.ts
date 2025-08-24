import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Users } from '../models/employee.model';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



export class EmployeeComponent implements OnInit {
  users: Users[] = [];
  newUser: Users = {
    id: 0,
    name: '',
    email: '',
    department: '',
    role: ''
  };

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(data => {
      this.users = data;
    });
  }


  addEmployee() {
    this.employeeService.createEmployee(this.newUser).subscribe(user => {
      this.users.push(user);

      // reset form after submission
      this.newUser = { id: 0, name: '', email: '', department: '', role: '' };
    });
  }

}
