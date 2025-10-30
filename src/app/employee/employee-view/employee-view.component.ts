import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-employee-view',
  imports: [CommonModule, FormsModule],
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
  absoluteUrl : string = "C:\Users\afzal\Desktop\my-project-backend"
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
      position: '',
      department: '',
      manager: '',
      designation: '',
      dateOfJoining: '',
      organization: '',
      workLocation: '',
      employementType: '',



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

  getEmployee() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const idString = params.get('employeeId');
      const employeeId = idString ? Number(idString) : 0;

      console.log('Fetched employee ID from route:', idString);
      if (employeeId > 0) {
        this.employeeService.getEmployeeById(employeeId).subscribe({
          next: (emp) => {
            this.info = emp;
            // if countryCode exists on the employee, set selection and load dependent lists
            if (this.info.countryCode) {
              this.selectedCountryCode = this.info.countryCode;
              // if countries already loaded, set country name immediately
              if (this.countries && this.countries.length) {
                const found = this.countries.find(
                  (c) => c.iso2 === this.selectedCountryCode
                );
                if (found) {
                  this.info.country = found.name || this.info.country;
                }
                this.getStateData(this.selectedCountryCode);
              } else {
                // wait for countries to load then get states
                this.getCountries();
                // getCountries will call getStateData after loading if info.countryCode is present
              }
            }
          },
          error: (err) => {
            console.error('Error fetching employee data:', err);
          },
        });
      }
    });
  }

  getCountries() {
    this.customerService.getCountryData().subscribe({
      next: (data: any) => {
        this.countries = data || [];

        if (this.info.countryCode) {
          this.selectedCountryCode = this.info.countryCode;

          const found = this.countries.find(
            (c) => c.iso2 === this.selectedCountryCode
          );
          if (found) {
            this.info.country = found.name || this.info.country;
          }
          this.getStateData(this.selectedCountryCode);
        }
      },
      error: (err) => {
        console.error('Error loading countries:', err);
      },
    });
  }

  getStateData(countryCode: string) {
    if (!countryCode) return;
    this.customerService.getStateData(countryCode).subscribe({
      next: (data: any) => {
        this.states = data || [];
        // if employee had a state, keep selection and load cities
        if (this.info.state) {
          this.selectedStateCode = this.info.state;
          this.getCityData(this.selectedStateCode);
        }
      },
      error: (err) => {
        console.error('Error loading states for', countryCode, err);
      },
    });
  }

  getCityData(stateCode: string) {
    if (!this.selectedCountryCode || !stateCode) return;
    this.customerService
      .getCityData(this.selectedCountryCode, stateCode)
      .subscribe({
        next: (data: any) => {
          this.cities = data || [];
        },
        error: (err) => {
          console.error('Error loading cities:', err);
        },
      });
  }

  selectedCountry(value: any) {
    let countryObj = null;
    if (!value) return;

    if (typeof value === 'string') {
      countryObj = this.countries.find((c) => c.iso2 === value);
    } else if (typeof value === 'object') {
      countryObj = value;
    }

    if (!countryObj) {
      console.warn('Selected country not found in countries list:', value);
      return;
    }

    // phone code handling: avoid duplicating phone codes
    const phoneCode = countryObj.phonecode ? String(countryObj.phonecode) : '';
    if (phoneCode) {
      const rawNumber = this.info.phone_no;
      this.info.phone_no = phoneCode
        ? `+${phoneCode}${rawNumber || ''}`
        : this.info.phone_no;
    }

    this.info.country = countryObj.name || '';
    this.info.countryCode = countryObj.iso2 || '';
    this.selectedCountryCode = countryObj.iso2 || '';

    // load dependent state/city lists
    this.getStateData(this.selectedCountryCode);
  }

  selectedState(state: string) {
    if (!state) return;
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
    const data = this.info;
    this.employeeService.updateEmployee(this.info).subscribe({
      next: (saved) => {
        this.users.push(saved);
        alert('Employee Updated successfully!');
        this.resetForm();
      },
      error: (err) => {
        if (err.status === 409) {
          alert(err.message);
        } else {
          alert(err.message || 'Error updating employee.');
        }
      },
    });
  }

  removeEmployee(id: any) {
    const idNum = Number(id);
    this.employeeService.deleteEmployee(idNum).subscribe({
      next: () => {
        console.log(`Employee with ID ${idNum} deleted successfully.`);
        this.users = this.users.filter(
          (emp) => Number(emp.employeeId) !== idNum
        );
      },
      error: (err) => console.error('Error deleting employee:', err),
    });
  }

  resetForm() {
    this.info =  {
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
      position: '',
      department: '',
      manager: '',
      designation: '',
      dateOfJoining: '',
      organization: '',
      workLocation: '',
      employementType: '',



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
    this.selectedCountryCode = '';
    this.selectedStateCode = '';
    this.cities = [];
    this.states = [];
  }
}
