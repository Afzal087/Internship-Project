import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee, UnifiedAllLeaves } from '../models/employee.model';
import { LeaveService } from '../services/leave.service';
import { EmployeeService } from '../services/employee.service';
import { DialogService } from '../dialog-box/dialog-service.service';

interface ExtendedLeave extends UnifiedAllLeaves {
  employeeDetails?: Employee;
  isLtaEligible: boolean;
}

@Component({
  selector: 'app-manage-leave',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-leave.component.html',
  styleUrl: './manage-leave.component.css',
})
export class ManageLeaveComponent implements OnInit {
  employees: Employee[] = [];
  allLeavesDisplay: ExtendedLeave[] = [];

  constructor(
    private dialog: DialogService,
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((data: Employee[]) => {
      this.employees = data;
      this.getAllLeaves();
    });
  }

  getAllLeaves() {
    this.leaveService.getAll().subscribe((data) => {
      this.processAndSortLeaves(data);
    });
  }

  processAndSortLeaves(leaves: UnifiedAllLeaves[]) {
    const today = new Date();
    
    const mergedData: ExtendedLeave[] = leaves.map((leave) => {
      const emp = this.employees.find((e) => e.employeeId === leave.employeeId);
      
      let isEligible = false;
      if (emp && emp.dateOfJoining) {
        const joinDate = new Date(emp.dateOfJoining);
        const diffYears = (today.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        isEligible = diffYears >= 3;
      }

      return { 
        ...leave, 
        employeeDetails: emp,
        isLtaEligible: isEligible
      };
    });

    this.allLeavesDisplay = mergedData.sort((a, b) => {
      const isAPending = a.status === 'PENDING';
      const isBPending = b.status === 'PENDING';

      if (isAPending && !isBPending) return -1;
      if (!isAPending && isBPending) return 1;

      return new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime();
    });
  }

  updateLeaveStatus(leaveId: number, buttonName: Event) {
    const target = (buttonName.target as HTMLButtonElement).innerText;
    const status = target.includes('APPROVE') ? 'APPROVED' : 'REJECTED';

    this.leaveService.setStatus(leaveId, status).subscribe(() => {
      this.getAllLeaves();
    });

    this.dialog.show(`Leave Request has been ${status} Successfully!`);
  }

  openLTADetails(leaveId: number) {
    this.dialog.show("Opening LTA Details...");
  }
}