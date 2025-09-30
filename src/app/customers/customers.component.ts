import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Country } from '../models/country.model';
import { countReset, log } from 'console';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
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

  // assume its india now assign selectedCountryCode to its Code ;

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

 

  getCountryCode() {
    const foundCountry = this.countries.find(
      (country: any) => country.country === this.info.country
    );
    console.log(foundCountry)
    if (foundCountry) {
      this.info.countryCode = foundCountry.code;
      console.log(this.info.countryCode);

    } else {
      this.info.countryCode = '';
      console.log('Cannot Find any Country Code');
    }
  }

  ngOnInit(): void {
    this.AssignmentInit();
    this.CustomerInit();
}
  
  
  

  CustomerInit(){
  return this.customerService.getCountry().subscribe((country) => {
      this.countries = country;
      
    });}

   AssignmentInit(){
     return this.customerService.get().subscribe((data) => {
      this.customer = data;
    });}

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
       alert("Customer Added Successfully");
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
