import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { count } from 'node:console';
import { AssignmentService } from '../services/assignment.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Project } from '../models/Project.model';
import { Department } from '../models/Department.model';
import { Organization } from '../models/Organization.model';
import e from 'express';

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
  isPermanentAddressDifferent: boolean = true;
  currentForm: number = 1;

  //Edit Mode Variables
  mode:'create' | 'edit' = 'create';
  employeeId: number | null = null;



  allProjects$: Observable<Project[]>;
  allDepartments$: Observable<Department[]>;
  allOrganizations$: Observable<Organization[]>;
  
  

    constructor( private route:  ActivatedRoute, private employeeService: EmployeeService, private customerService: CustomerService, private router: Router, private service: AssignmentService) {
    this.allDepartments$ = this.service.department$;
    this.allOrganizations$ = this.service.organization$;
    this.allProjects$ = this.service.project$;
    
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    this.maxBirthDate = eighteenYearsAgo.toISOString().split('T')[0];
  }


  togglePermanentAddress() {
    this.isPermanentAddressDifferent = !this.isPermanentAddressDifferent;

    this.info.isAddressDifferent = this.isPermanentAddressDifferent;
  }

onSubmit(form: NgForm) {
  if (form.invalid) return;

  if (this.mode === 'create') {

    if (!this.isPermanentAddressDifferent) {
      this.info.permanent_country = '';
      this.info.permanent_countryCode = '';
      this.info.permanent_state = '';
      this.info.permanent_city = '';
      this.info.permanent_street = '';
      this.info.permanent_buildingNo = '';
      this.info.permanent_postal_code = '';
    }

    this.addEmployee(form);

  } else {

    this.info.employeeId = this.employeeId!; // ensure id is set

    this.employeeService.updateEmployee(this.info).subscribe({
      next: (res) => {
        alert("Employee updated successfully!");
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.log("Update Error", err);
        alert("Failed to update employee");
      }
    });
  }
}



  
  nextForm(form: NgForm) {
    if (this.currentForm >= 1 && this.currentForm < 6) {
      if (form.invalid) {
        alert(
          'Invalid Form Details Please Check All Fields to Move to Next Form'
        );
      }
      this.currentForm++;
    }
    console.log(this.info);
  }

  CheckEligble(value: string) {
    if (value === 'Yes') {
      this.isEligble = 'Yes';
      if(this.info.salary>String(15000)){
        this.calcSalary();
      }
    } else {
      this.isEligble = 'No';
      this.calcTDS();
    }
  }

  calcTDS(){
const salary = Number(this.info.salary) || 0;
const annualSalary = salary * 12;

  let tdsRate = 0; // default 0%

  if (annualSalary <= 300000) {
    tdsRate = 0;
  } else if (annualSalary <= 600000) {
    tdsRate = 0.05;
  } else if (annualSalary <= 900000) {
    tdsRate = 0.10;
  } else if (annualSalary <= 1200000) {
    tdsRate = 0.15;
  } else if (annualSalary <= 1500000) {
    tdsRate = 0.20;
  } else {
    tdsRate = 0.30;
  }
  const esi = salary <= 21000 ? salary * 0.0075 : 0;
  const annualTds = annualSalary * tdsRate;
  const epf = 0;
  const tds = annualTds / 12;
  this.info.tds = String(tds.toFixed(2));
  this.info.ESIContribution = String(esi.toFixed(2));
  this.info.netSalary = String((salary - tds - esi - epf).toFixed(2));
  this.info.deductionAmount = String((tds + esi + epf).toFixed(2));

  console.log('Calculated TDS:', tds);
  return tds;

  }

  calcSalary() {
  const salary = Number(this.info.salary) || 0;
  const tds = this.calcTDS();
  const esi = salary <= 21000 ? salary * 0.0075 : 0;
  const epf = 1800;
  if (this.isEligble === 'Yes') {
  this.info.DeductionRate = '1800' }

  this.info.ESIContribution = String(esi.toFixed(2));
  this.info.netSalary = String((salary - tds - esi - epf).toFixed(2));
  this.info.deductionAmount = String((tds + esi + epf).toFixed(2));

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
      this.users = data;
    });

    const id = this.route.snapshot.paramMap.get('employeeId'); 
    
    if(id){
      this.mode = 'edit';
      this.employeeId = +id;
      this.employeeService.getEmployeeById(this.employeeId).subscribe((data) => {
        this.info = data;
        // Load states and cities for edit mode (will be called after countries load)
        // If countries are already loaded, load address data immediately
        if (this.countries.length > 0) {
          this.loadAddressDataForEdit();
        }
        // Otherwise, loadAddressDataForEdit will be called from getCountries() subscribe
      });
    } 
  }

  loadAddressDataForEdit() {
    // Load current address data
    if (this.info.countryCode) {
      this.selectedCountryCode = this.info.countryCode;
      // Find and set the country name for the dropdown
      const country = this.countries.find((c) => c.iso2 === this.info.countryCode);
      if (country) {
        this.info.country = country.name;
      }
      
      // Load states, then cities
      this.loadStateData(this.info.countryCode).subscribe(() => {
        if (this.info.state) {
          this.selectedStateCode = this.info.state;
          this.loadCityData(this.info.countryCode, this.info.state).subscribe();
        }
      });
    }

    // Load permanent address data
    if (this.info.permanent_countryCode) {
      this.selectedPermanentCountryCode = this.info.permanent_countryCode;
      // Find and set the permanent country name for the dropdown
      const permanentCountry = this.countries.find((c) => c.iso2 === this.info.permanent_countryCode);
      if (permanentCountry) {
        this.info.permanent_country = permanentCountry.name;
      }
      
      // Load permanent states, then cities
      this.loadPermanentStateData(this.info.permanent_countryCode).subscribe(() => {
        if (this.info.permanent_state) {
          this.selectedPermanentStateCode = this.info.permanent_state;
          this.loadPermanentCityData(this.info.permanent_countryCode, this.info.permanent_state).subscribe();
        }
      });
    }
  }

  getCountryName(code: string) {
    const countries = this.countries;
    const country = countries.find((c) => c.iso2 === code);
    if (country) {
      this.info.currency = country.currency;
      return country.name;
    }
    return '';
  }

  getStateName(stateCode: string): string {
    if (!stateCode || !this.states || this.states.length === 0) return stateCode || '';
    const state = this.states.find((s) => s.iso2 === stateCode);
    return state ? state.name : stateCode;
  }

  getPermanentStateName(stateCode: string): string {
    if (!stateCode || !this.permanentStates || this.permanentStates.length === 0) return stateCode || '';
    const state = this.permanentStates.find((s) => s.iso2 === stateCode);
    return state ? state.name : stateCode;
  }

  getCountries() {
    this.customerService.getCountryData().subscribe((data: any) => {
      this.countries = data;
      // If in edit mode and employee data is already loaded, populate address dropdowns
      if (this.mode === 'edit' && this.info && this.info.countryCode) {
        this.loadAddressDataForEdit();
      }
    });
  }

  getStateData(code: string) {
    this.customerService.getStateData(code).subscribe((data: any) => {
      this.states = data;
    });
  }

  getCityData(countryCode: string, stateCode: string) {
    this.customerService.getCityData(countryCode, stateCode).subscribe((data: any) => {
        this.cities = data;
      });
  }

  getPermanentStateData(code: string) {
    this.customerService.getStateData(code).subscribe((data: any) => {
      this.permanentStates = data;
    });
  }

  getPermanentCityData(countryCode: string, stateCode: string) {
    this.customerService
      .getCityData(countryCode, stateCode)
      .subscribe((data: any) => {
        this.permanentCities = data;
      });
  }

  // Helper methods that return observables for chaining
  loadStateData(code: string): Observable<any> {
    return this.customerService.getStateData(code).pipe(
      tap((data: any) => {
        this.states = data;
      })
    );
  }

  loadCityData(countryCode: string, stateCode: string): Observable<any> {
    return this.customerService.getCityData(countryCode, stateCode).pipe(
      tap((data: any) => {
        this.cities = data;
      })
    );
  }

  loadPermanentStateData(code: string): Observable<any> {
    return this.customerService.getStateData(code).pipe(
      tap((data: any) => {
        this.permanentStates = data;
      })
    );
  }

  loadPermanentCityData(countryCode: string, stateCode: string): Observable<any> {
    return this.customerService.getCityData(countryCode, stateCode).pipe(
      tap((data: any) => {
        this.permanentCities = data;
      })
    );
  }

  selectedCountry(countryName: any) {
    const country = this.countries.find((c) => c.name === countryName);
    if (country) {
      this.info.countryCode = country.iso2;
      this.selectedCountryCode = country.iso2;
      this.info.currency = country.currency;

      // Reset state and city when country changes
      this.info.state = '';
      this.info.city = '';
      this.selectedStateCode = '';
      this.states = [];
      this.cities = [];

      // Fetch states for the selected country
      this.getStateData(country.iso2);
    }
  }

  selectedPermanentCountry(countryName: any) {
    const country = this.countries.find((c) => c.name === countryName);
    if (country) {
      this.info.permanent_countryCode = country.iso2;
      this.selectedPermanentCountryCode = country.iso2;

      // Reset permanent state and city when country changes
      this.info.permanent_state = '';
      this.info.permanent_city = '';
      this.selectedPermanentStateCode = '';
      this.permanentStates = [];
      this.permanentCities = [];

      // Fetch states for the selected permanent country
      this.getPermanentStateData(country.iso2);
    }
  }

  selectedState(state: string) {
    this.selectedStateCode = state;
    this.info.state = state;

    

    // Reset city when state changes
    this.info.city = '';
    this.selectedCity = '';
    this.cities = [];

    // Fetch cities for the selected state
    this.getCityData(this.selectedCountryCode, state);
  }

  selectedPermanentState(state: string) {
    this.selectedPermanentStateCode = state;
    this.info.permanent_state = state;

    // Reset permanent city when state changes
    this.info.permanent_city = '';
    this.selectedPermanentCity = '';
    this.permanentCities = [];

    // Fetch cities for the selected permanent state using permanent country code
    if (this.selectedPermanentCountryCode) {
      this.getPermanentCityData(this.selectedPermanentCountryCode, state);
    }
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
    if (!this.isPermanentAddressDifferent) {
      this.info.permanent_country = '';
      this.info.permanent_countryCode = '';
      this.info.permanent_state = '';
      this.info.permanent_city = '';
      this.info.permanent_street = '';
      this.info.permanent_buildingNo = '';
      this.info.permanent_postal_code = '';
    }

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
    gender: '',
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
    //Permanent Address
    permanent_country: '',
    permanent_countryCode: '',
    permanent_state: '',
    permanent_city: '',
    permanent_street: '',
    permanent_buildingNo: '',
    permanent_postal_code: '',
    // 🔹 Job Info

    department: '',
    manager: '',
    designation: '',
    dateOfJoining: '',
    organization: '',
    workLocation: '',
    employementType: '',
    epfEligible: '',
    DeductionRate: '',
    deductionAmount: '',
    netSalary: '',
    ESIContribution: '',
    
    tds: '',

    salary: '',
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    pfNumber: '',
    panNumber: '',

    offerLetter: null,
    idProof: null,
    isAddressDifferent: this.isPermanentAddressDifferent,
    };

    // Reset dropdowns
    this.states = [];
    this.cities = [];
    this.permanentStates = [];
    this.permanentCities = [];
    this.selectedCountryCode = '';
    this.selectedStateCode = '';
    this.selectedCity = '';
    this.selectedPermanentCountryCode = '';
    this.selectedPermanentStateCode = '';
    this.selectedPermanentCity = '';
  }

  info: Employee = {
    firstName: '',
    lastName: '',
    dob: '',
    phone_no: '',
    email: '',
    aadharNo: '',
    gender: '',
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
    //Permanent Address
    permanent_country: '',
    permanent_countryCode: '',
    permanent_state: '',
    permanent_city: '',
    permanent_street: '',
    permanent_buildingNo: '',
    permanent_postal_code: '',
    // 🔹 Job Info

    department: '',
    manager: '',
    designation: '',
    dateOfJoining: '',
    organization: '',
    workLocation: '',
    employementType: '',
    epfEligible: '',
    DeductionRate: '',
    deductionAmount: '',
    netSalary: '',
    ESIContribution: '',
    
    tds: '',

    salary: '',
    accountHolderName: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    pfNumber: '',
    panNumber: '',

    offerLetter: null,
    idProof: null,
    isAddressDifferent: this.isPermanentAddressDifferent,
  };

  selectedPermanentCountryCode: string = '';
  selectedPermanentStateCode: string = '';
  selectedPermanentCity: string = '';

  selectedCountryCode: string = '';
  selectedStateCode: string = '';
  selectedCity: string = '';

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  permanentCountry:any[] = [];
  permanentStates: any[] = [];
  permanentCities: any[] = [];
  
  isPermanentSame: boolean = false;

}
