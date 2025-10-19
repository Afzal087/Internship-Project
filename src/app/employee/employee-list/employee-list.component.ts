import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  allEmployee: Employee[] = []

  addEmployee() {
    this.router.navigate(['dashboard/employees/add']);
  }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((emps: Employee[]) => {
      this.allEmployee = emps;
    });
  }

  onView(employeeId: number) {
    console.log("Navigating to view employee with ID:", employeeId);
    this.router.navigate(['/dashboard/employees/view', employeeId]);
  }

  onDelete(employeeId: number) {
    alert(`Delete employee with ID: ${employeeId}`);
  }
  onEdit(employeeId: number) {
    this.router.navigate(['/dashboard/employees/edit', employeeId]);
  }
}
