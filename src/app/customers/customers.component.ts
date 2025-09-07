import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [FormsModule,],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

   constructor(private customerService : CustomerService ){}

  customers : String[]=[];

  newCustomer : Customer = {
      id : '',
      name: '',
      email: '',
      location : '',
      customer_id: ''
  };

  addCustomer(){
    this.customerService.add(this.newCustomer).subscribe({
      next:
    });
  }

  removeCustomer(){}
  updateCustomer(){}


}
