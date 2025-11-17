import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgControl,} from '@angular/forms';
import { Department } from '../models/Department.model';
import { AssignmentService } from '../services/assignment.service';

import { Observable } from 'rxjs';
import { Organization } from '../models/Organization.model';
import { Project } from '../models/Project.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { error } from 'node:console';





@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {

  allDepartments$ : Observable<Department[]>;
  allOrganizations$ : Observable<Organization[]>;
  allProjects$ : Observable<Project[]>;
  allEmployees$ : Observable<Employee[]>;
  assignmentList$ : Observable<any[]>;


  ids : any= {
    empId :  0,
    deptId : 0 ,
    proId :  0,
    orgId : 0
  }  
  

  constructor(private service : AssignmentService , private employeeService : EmployeeService) {

   this.allDepartments$ = this.service.department$
   this.allOrganizations$ = this.service.organization$
   this.allProjects$ = this.service.project$
  this.allEmployees$ = this.employeeService.employee$;
this.assignmentList$ = this.service.assignmentList$;

  }

 ngOnInit(): void {
   this.service.getAllDepartments().subscribe();
   this.service.getAllOrganizations().subscribe();
   this.service.getAllProjects().subscribe();
   this.employeeService.getEmployee().subscribe();
  this.service.getAllAssignments().subscribe();
 }
   

 deleteAssignment(id: string){
  const numId = Number(id);
  console.log("Deleting assignment with ID:", id);
   return this.service.deleteAssignment(numId).subscribe(() =>{
    this.service.getAllAssignments().subscribe();
  })
 }



 onSubmit() {
    console.log("Form submitted with IDs:", this.ids);

    const empIdNum = Number(this.ids.empId);
    const deptIdNum = Number(this.ids.deptId) || 0;
    const proIdNum = Number(this.ids.proId) || 0;
    const orgIdNum = Number(this.ids.orgId) || 0;
    // 1. Basic Validation
    if (!this.ids.empId || this.ids.empId === 0) {
      alert('Please select an employee.');
      return;
    }

    const employee = this.employeeService.currentEmployeesValue.find(e => e.employeeId === empIdNum);
    
    
    // Find the others. Use 'find' or set to null if ID is 0.
    const department = this.ids.deptId === 0
      ? null
      : this.service.currentDepartmentsValue.find(d => d.departmentId === deptIdNum);
      
    const project = this.ids.proId === 0
      ? null
      : this.service.currentProjectsValue.find(p => p.projectId === proIdNum);

    const organization = this.ids.orgId === 0
      ? null
      : this.service.currentOrganizationsValue.find(o => o.organizationId === orgIdNum);

   
    if (!employee) {
      alert('Error: Could not find selected employee. Please refresh.');
      return;
    }
      
    // 4. Build the complex payload that matches your Java Entity
    const assignmentPayload = {
      employee: employee,
      department: department,
      project: project,
      organization: organization
    };

 
    this.service.createAssignment(assignmentPayload).subscribe({
      next: (response) => {
        alert('Assignment saved successfully!');
        
       
        this.ids = { empId: 0, deptId: 0, proId: 0, orgId: 0 };
  
        this.service.getAllAssignments().subscribe();
      },
      error: (err) => {
        console.error('Error saving assignment:', err);
        alert('Failed to save assignment.');
      }
    });
  }


  }
 

