import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  imports: [FormsModule, CommonModule, MatIcon],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  allEmployee: Employee[] = []
  totalEmployee:number= 0;


  addEmployee() {
    this.router.navigate(['dashboard/employees/add']);
  }

  ngOnInit(): void {
    this.employeeService.getEmployee();

    this.employeeService.employee$.subscribe((data) => {
      this.allEmployee = data;
     this.totalEmployee = data.length;
    });
  }


  onEdit(employeeId: number){
    this.router.navigate(['/employees/view/',employeeId]);
  }


  downloadReport(employeeId: number) {
    this.employeeService.downloadEmployeeReport(employeeId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob); 
      const a = document.createElement('a');
      a.href = url;
      a.download = `employee_${employeeId}_report.pdf`; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
        
    });
  }



  onView(employeeId: number) {
    console.log("Navigating to view employee with ID:", employeeId);
    this.router.navigate(['/dashboard/employees/view', employeeId]);
  }

  onDelete(employeeId: number) {  
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.allEmployee = this.allEmployee.filter(emp => emp.employeeId !== employeeId);
    });
  }

}
