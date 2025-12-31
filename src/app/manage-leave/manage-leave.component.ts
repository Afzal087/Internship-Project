import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Employee,
  EmployeeWithLeaves,
  LeaveRequest,
  UnifiedAllLeaves,
} from '../models/employee.model';
import { LeaveService } from '../services/leave.service';
import { EmployeeService } from '../services/employee.service';
import { DialogService } from '../dialog-box/dialog-service.service';

@Component({
  selector: 'app-manage-leave',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-leave.component.html',
  styleUrl: './manage-leave.component.css',
})
export class ManageLeaveComponent implements OnInit {
  constructor(
    private dialog: DialogService,
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) {}

  // TemplateArraysOfData
  employeeWithLeaves: EmployeeWithLeaves[] = [];
  leaveRequests: UnifiedAllLeaves[] = [];
  employees: Employee[] = [];

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((data: Employee[]) => {
      this.employees = data;
      this.getAllLeaves();
    });
  }

  

  // CombineEmployeeWithLeaveRequests
  CombineData() {
    this.employeeWithLeaves = this.employees.map((emp) => ({
      employee: emp,
      leaves: this.leaveRequests.filter(
        (leave) => leave.employeeId === emp.employeeId
      ),
    }));
  }

  // FetchAllLeaveRequests
  getAllLeaves() {
    this.leaveService.getAll().subscribe((data) => {
      this.leaveRequests = data;
      this.CombineData();
    });
  }

  // DialogBoxMessages
  updateLeaveStatus(leaveId: number, buttonName: Event) {
    const target = (buttonName.target as HTMLButtonElement).innerText;
    this.leaveService
      .setStatus(leaveId, target.includes('APPROVE') ? 'APPROVED' : 'REJECTED')
      .subscribe(() => {
        this.getAllLeaves();
      });
    this.dialog.show(
      `Leave Request has Been ${
        target.includes('APPROVE') ? 'Approved' : 'Rejected'
      } Successfully!`
    );
  }
}
