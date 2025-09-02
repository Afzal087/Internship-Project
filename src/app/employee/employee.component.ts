import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Users } from '../models/employee.model';
import { Router } from '@angular/router';
import { f } from "../../../node_modules/@angular/material/icon-module.d-COXCrhrh";
import { MatIcon } from '@angular/material/icon';
import { error } from 'console';


@Component({
  standalone: true,
  selector: 'app-employee',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



export class EmployeeComponent implements OnInit {
  users: Users[] = [];


  newUser: Users = {
    name: '',
    email: '',
    department: '',
    role: ''
  };

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(data => {
      this.users = data;
      console.log(data);
    });

  }


  addEmployee() {
    console.log("Sending data:", this.newUser);
    this.employeeService.createEmployee(this.newUser).subscribe({
      next: (saved) => {
        this.users.push(saved);
        this.newUser = { name: '', email: '', department: '', role: '' }; // reset model
      },
      error: (err) => console.error('Error adding employee:', err)
    });

  }

  removeEmployee(id: any ) {
  this.employeeService.deleteEmployee(id).subscribe({
    next: () => {
      console.log(`Employee with ID ${id} deleted successfully.`);
      
      // ✅ Remove deleted employee from UI without reloading
      this.users = this.users.filter(emp => emp.id !== id);

      // OR reload the whole list properly
      // this.loadEmployees();
    },
    error: (err) => console.error('Error deleting employee:', err)
  });
}

  updateEmployee(id: any){
    this.employeeService.updateEmployee(id).subscribe({
      next: (updated)=>{
        console.log(`Employee with ID ${id} updated successfully.`);
        this.users = this.users.map(emp => emp.id ===id ? updated: emp)
      },
      error: (err) => console.error('Error updating employee:', err)
    })
  }

}
