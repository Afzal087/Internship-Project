import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { environment } from '../../environment/environment';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  constructor(private customerService: CustomerService) {}

  customer: Customer[] = [];
  countries: any[] = [];
  states : any[]= [];
  cities : any[]= [];

  selectedCountryCode: string = '';
  selectedStateCode: string = '';
  selectedCity: string = '';

  info: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    countryCode: '',
    street: '',
    phone_no: '',
    buildingNo: '',
    gender: '',
    dob: '',
    city: '',
    state: '',
    nationality: '',
  };

  ngOnInit(): void {
    this.getCountries();
  }

 getCountries() {
      this.customerService.getCountryData().subscribe((data:any)=>{
        this.countries = data;
        
      })
 }
 getStateData(code:string) {
    this.customerService.getStateData(this.selectedCountryCode).subscribe((data: any)=>{
      this.states= data;
     
    })
 }  
getCityData(code:string) {
   this.customerService.getCityData(this.selectedCountryCode, this.selectedStateCode).subscribe((data: any)=>{
     this.cities= data;
    
   })
 }
 
  selectedCountry(code:any) {
    this.info.phone_no = '+'.concat(code.phonecode)+this.info.phone_no;
    this.info.country = code.name;
    this.info.countryCode = code.iso2;
    this.selectedCountryCode = code.iso2;
    this.getStateData(code);
  }

  selectedState(state: string) {
    this.selectedStateCode = state;
  
    this.getCityData(this.selectedStateCode);
  }



  // customer

  addCustomer(form: NgForm) {
    this.customerService.add(this.info).subscribe({
      next: (saved) => {
        this.customer.push(saved);
        this.info = {
          firstName: '',
          lastName: '',
          email: '',
          country: '',
          countryCode: '',
          street: '',
          phone_no: '',
          buildingNo: '',
          gender: '',
          dob: '',
          city: '',
          state: '',
          nationality: '',
        };
        alert('Customer Added Successfully');
      },
      error: (err) => {
        if (err.status === 409) {
          alert(err.message);
          console.log(err.message);
        } else {
          alert('Error Adding Customer, Please Try Again');
        }
      },
    });
  }

  removeCustomer(id: any) {
    this.customerService.delete(id).subscribe({
      next: () => {
        console.log(`Customer with id ${id} deleted`);
        this.customer = this.customer.filter(
          (customer) => customer.customerId !== id
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  updateCustomer(id: any) {}
}
