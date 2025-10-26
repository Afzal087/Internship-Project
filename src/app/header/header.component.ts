import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatIconModule, FormsModule, CommonModule,MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  employees: Employee[] = [];
  showNotifications: boolean = false;
  upcomingBirthdays: { name: string; dob: Date; nextBirthday: Date }[] = [];
  birthdayCount: number = 0;

  searchKeyword: string = '';
  
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((data: Employee[]) => {
      this.employees = data;
      console.log('Employees in Header:', this.employees);
      this.getDOB();
    });
  }

  getDOB() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const todayDate = new Date(currentYear, today.getMonth(), today.getDate());

    // Map all employees to include their next birthday
    const birthdays = this.employees.map((employee) => {
      const dob = new Date(employee.dob);
      const month = dob.getMonth();
      const day = dob.getDate();

      // Calculate next birthday
      let nextBirthday = new Date(currentYear, month, day);
      if (nextBirthday < todayDate) {
        nextBirthday = new Date(currentYear + 1, month, day);
      }

      return {
        name: employee.firstName + ' ' + employee.lastName,
        dob: dob,
        nextBirthday: nextBirthday
      };
    });

    // Sort by next birthday (ascending)
    birthdays.sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime());

    // Take only the next 5 upcoming birthdays
    this.upcomingBirthdays = birthdays.slice(0, 5);
    this.birthdayCount = this.upcomingBirthdays.length;

    console.log('Upcoming Birthdays:', this.upcomingBirthdays);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch(): void {
    this.employeeService.searchEmployees(this.searchKeyword);
  }

  onClear(): void {
    this.searchKeyword = '';
    this.employeeService.searchEmployees(this.searchKeyword);
  }
}
