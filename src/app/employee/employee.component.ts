import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { count } from 'node:console';
import { AssignmentService } from '../services/assignment.service';
import { Observable } from 'rxjs';
import { Project } from '../models/Project.model'
import { Department } from '../models/Department.model';
import { Organization } from '../models/Organization.model';




@Component({
  standalone: true,
  selector: 'app-employee',
  imports: [CommonModule, FormsModule, MatIcon],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
 

  
  maxBirthDate: string;
  users: Employee[] = [];
  isEditing: boolean = true;
  editingId: number | null = null;
  isEligble: string = '';
  // Country/State/City dropdowns
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];


  currentForm: number = 1;

  selectedCountryCode: string = '';
  selectedStateCode: string = '';
  selectedCity: string = '';

  // Employee form model
  info: Employee = {
    // 🔹 Personal Info
      firstName: '',
      lastName: '',
      dob: '',
      phone_no: '',
      email: '',
      aadharNo: '',
      gender  : '',
      maritalStatus: '',
      fatherName: '', 
      employeeCode: '',

      // 🔹 Address Info
      country: '',
      countryCode: '',
      state: '',
      city: '',
      street: '',
      buildingNo: '',
      postal_code: '',

      // 🔹 Job Info
    
      department: '',
      manager: '',
      designation: '',
      dateOfJoining: '',
      organization: '',
      workLocation: '',
      employementType: '',
     
    DeductionRate:'',
    deductionAmount:'',
    netSalary:'',



      salary: '',
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      pfNumber: '',
      panNumber: '',
      
      offerLetter: null,
      idProof: null,
  };


  allProjects$ : Observable<Project[]>;
  allDepartments$ : Observable<Department[]>;
  allOrganizations$ : Observable<Organization[]>;




  constructor(
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private router: Router,
    private service : AssignmentService
  ) {

    this.allDepartments$ = this.service.department$
   this.allOrganizations$ = this.service.organization$
    this.allProjects$ = this.service.project$
//DateBy18
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    this.maxBirthDate = eighteenYearsAgo.toISOString().split('T')[0];
  }

  nextForm(form:NgForm) {
    if (this.currentForm >= 1 && this.currentForm < 6 ) {
      if(form.invalid){
        alert("Invalid Form Details Please Check All Fields to Move to Next Form");
      }
      this.currentForm++;
    }
    console.log(this.info);
  }


  
CheckEligble(value : string){

  if(value==="Yes"){
    this.isEligble = "Yes"
    this.info.netSalary = this.info.salary;
  }
  else{
    this.isEligble = "No"
  }
    
}
setNetSalary(value:Event){
  this.info.netSalary = String(value);

}

calcSalary(value : Event){
const rate = Number(value)
const salary = parseInt(this.info.salary);
const result = (rate/100)* (salary)
this.info.deductionAmount = String(result);
this.info.netSalary = String(salary-result);
}



  previousForm() {
    if (this.currentForm <= 6 && this.currentForm > 1) {
      this.currentForm--;
    }
  }

  ngOnInit(): void {
    this.service.getAllDepartments().subscribe();
    this.service.getAllOrganizations().subscribe();
    this.service.getAllProjects().subscribe();
    this.getCountries();
    this.employeeService.getEmployee().subscribe((data) => {
      this.users  = data;
      
    });
  }

  getCountryName(code: string) {
    const countries = this.countries;
    const country = countries.find((c) => c.iso2 === code);
     this.info.currency = country.currency;

     return country.name

  } 

  getCountries() {
    this.customerService.getCountryData().subscribe((data: any) => {
      this.countries = data;
    });
  }

  getStateData(code: string) {
    this.customerService
      .getStateData(this.selectedCountryCode)
      .subscribe((data: any) => {
        this.states = data;
      });
  }

  getCityData(code: string) {
    this.customerService
      .getCityData(this.selectedCountryCode, this.selectedStateCode)
      .subscribe((data: any) => {
        this.cities = data;
      });
  }

  selectedCountry(countryName: any) {
    const country = this.countries.find((c) => c.name === countryName);
    this.info.countryCode = country.iso2;
    this.selectedCountryCode = country.iso2;
    this.getStateData(country.iso2);
    
  if (country) {
    this.info.currency = country.currency;
  }
  }

  selectedState(state: string) {
    this.selectedStateCode = state;
    this.info.state = state;
    this.getCityData(this.selectedStateCode);
  }

  onOfferLetterUpload(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.info.offerLetter = file;
      console.log('Offer letter uploaded:', file.name);
    }
  }

  onIdProofUpload(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.info.idProof = file;
      console.log('ID proof uploaded:', file.name);
    }
  }

  toggleMode() {
    this.isEditing = !this.isEditing;
  }

  addEmployee(userForm: NgForm) {
    if (!userForm.valid) return;

    console.log('Submitting employee data:', this.info);

    this.employeeService.createEmployee(this.info).subscribe({
      next: (saved) => {
        this.users.push(saved);
        this.router.navigate(['employees']);
        alert('Employee added successfully!');
        this.resetForm();
        
         
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Employee with this email already exists.');
        } else {
          alert('Error adding employee. Please try again.');
        }
      },
    });
  }

  removeEmployee(id: any) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        console.log(`Employee with ID ${id} deleted successfully.`);
        this.users = this.users.filter((emp) => emp.employeeId !== id);
      },
      error: (err) => console.error('Error deleting employee:', err),
    });
  }

  resetForm() {
    this.info = {
      // 🔹 Personal Info
      firstName: '',
      lastName: '',
      dob: '',
      phone_no: '',
      email: '',
      aadharNo: '',
      gender  : '',
      maritalStatus: '',
      fatherName: '', 
      employeeCode: '',

      // 🔹 Address Info
      country: '',
      countryCode: '',
      state: '',
      city: '',
      street: '',
      buildingNo: '',
      postal_code: '',

      // 🔹 Job Info
  
      department: '',
      manager: '',
      designation: '',
      dateOfJoining: '',
      organization: '',
      workLocation: '',
      employementType: '',

    DeductionRate:'',
    deductionAmount:'',
    netSalary:'',


      salary: '',
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      pfNumber: '',
      panNumber: '',
      
      offerLetter: null,
      idProof: null,
    };
  }
}
