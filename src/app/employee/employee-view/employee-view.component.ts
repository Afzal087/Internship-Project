import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employee.model';  
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-employee',
  imports: [ CommonModule, FormsModule],
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css'],
})
export class EmployeeViewComponent implements OnInit {

  
  users: Employee[] = [];
  isEditing: boolean = false;
  // Country/State/City dropdowns
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  selectedCountryCode: string = '';
  selectedStateCode: string = '';
  selectedCity: string = '';

  // Employee form model
  info: Employee = {
    // 🔹 Personal Info
    firstName: '',
    lastName: '',
    dob: '',
    employeeCode:'',
    phone_no: '',
    email: '',

    // 🔹 Job Info
    position: '',
    department: '',
    manager: '',
    joiningDate: '',
    employementType:'',

    // 🔹 Payroll Info
    salary: '',
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    bankAddress: '',
    ifscCode: '',

    // 🔹 Address Info
    country: '',
    countryCode: '',
    state: '',
    city: '',
    street: '',
    buildingNo: '',

    // 🔹 Documents
    offerLetter: null,
    idProof: null,
  };

  constructor(
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getEmployee();
  }

  getEmployee(){

    this.activatedRoute.paramMap.subscribe(params => {
      const idString = params.get('employeeId');
      const employeeId = idString? Number(idString) : 0;

      console.log('Fetched employee ID from route:', idString);
      if(employeeId>0){
        this.employeeService.getEmployeeById(employeeId).subscribe({
          next:(emp)=>{
            this.info = emp;
          },
          error: (err)=>{
            console.error('Error fetching employee data:', err);
          }
        })
      }
    })
    

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

  selectedCountry(code: any) {
    this.info.phone_no = '+'.concat(code.phonecode).concat(this.info.phone_no);
    this.info.country = code.name;
    this.info.countryCode = code.iso2;
    this.selectedCountryCode = code.iso2;
    this.getStateData(code);
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

  toggleMode() { this.isEditing = !this.isEditing }

 addEmployee(userForm: NgForm) {
  if (!userForm.valid) return;

  console.log('Submitting employee data:', this.info);

  this.employeeService.createEmployee(this.info).subscribe({
    next: (saved) => {
      this.users.push(saved);
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

  updateEmployee(id: any) {
    this.employeeService.updateEmployee(id).subscribe({
      next: (updated) => {
        console.log(`Employee with ID ${id} updated successfully.`);
        this.users = this.users.map((emp) =>
          emp.employeeId === id ? updated : emp
        );
      },
      error: (err) => console.error('Error updating employee:', err),
    });
  }

  resetForm() {
    this.info = {
      firstName: '',
      lastName: '',
      dob: '',
      phone_no: '',
      email: '',
      position: '',
      department: '',
      manager: '',
      joiningDate: '',
      employeeCode:'',
      salary: '',
      accountHolderName: '',
      employementType:'',
      accountNumber: '',
      bankName: '',
      bankAddress: '',
      ifscCode: '',
      country: '',
      countryCode: '',
      state: '',
      city: '',
      street: '',
      buildingNo: '',
      offerLetter: null,
      idProof: null,
    };
  }
}
