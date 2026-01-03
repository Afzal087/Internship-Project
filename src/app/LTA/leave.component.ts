import { Component, NgModule, signal } from '@angular/core';
import { Employee } from '../models/employee.model';
import { LeaveRequest } from '../models/employee.model';
import { FamilyMember } from '../models/employee.model';
import { FormBuilder, FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogService } from '../dialog-box/dialog-service.service';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveService } from '../services/leave.service';
import { ManageLeaveComponent } from '../manage-leave/manage-leave.component';


@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-leave-management',
  templateUrl: './leave.component.html'
})



export class LeaveComponent {
  // Mock user tenure - you can set this based on your logic


constructor(private leaveService: LeaveService, private dialog: DialogService,private fb:  FormBuilder, private employeeService : EmployeeService ,private route :ActivatedRoute, private router : Router ) {}
  
  // The single object that holds all form data
  leaveData: LeaveRequest = {
    leaveId: 0,
    employeeId: 0,
    requestType: 'ANNUAL',
    fromDate: '',
    toDate: '',
    backupPerson: '',
    emergencyContact: '',
    requestReason: '',
    status: 'PENDING',
    familyMembers: []
  };
  userTenureYears : boolean = false;

  getLTAEligibilityYears() {
    const isEligible = this.employeeService.getJoiningDate(this.leaveData.employeeId);
    if(isEligible) { this.userTenureYears = true;} else {this.userTenureYears = false;}
  }

  getRouteID(){
    this.leaveData.employeeId = Number(this.route.snapshot.paramMap.get('employeeId'));
  }

  ngOnInit(): void {
    this.getRouteID();
    this.getLTAEligibilityYears();
  }

    
  // Logic to add a member
  addMember(relationType: string) {
    this.leaveData.familyMembers!.push({
      relation: relationType,
      memberName: ''
    });
  }




  // Logic to remove a member
  removeMember(index: number) {
    this.leaveData.familyMembers!.splice(index, 1);
  }
  

  // Business logic for "can add"
  canAdd(type: string): boolean {
    const count = this.leaveData.familyMembers!.filter(m => m.relation === type).length;
    if (type === 'Spouse') return count < 1;
    if (type === 'Parent') return count < 2;
    return true; // Children can be many
  }

  submit(){
    if(this.leaveData.requestType === 'LTA'){
      this.submitLTARequest();
    } else {
      this.submitApplication();
    }
  }


  submitLTARequest() {
    this.leaveService.submitLTARequest(this.leaveData, this.leaveData.employeeId).subscribe({
      next: (response) => {
        this.dialog.show("Leave request submitted successfully.");    
        this.router.navigate(['/employee', this.leaveData.employeeId]);
      },
      error: (error) => {
        this.dialog.show("Error submitting leave request. Please try again.");
      }
    }); 
  }

  submitApplication() {
     this.leaveService.submitLeaveRequest(this.leaveData, this.leaveData.employeeId).subscribe({
      next: (response) => {
        this.dialog.show("Leave request submitted successfully.");    
        this.router.navigate(['/employee', this.leaveData.employeeId]);
      },
      error: (error) => {
        this.dialog.show("Error submitting leave request. Please try again.");
      }
    });
  }
}