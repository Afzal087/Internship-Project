import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-customers',
  imports: [FormsModule, MatIcon],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent {
  constructor(private customerService: CustomerService) {}

  customer: Customer[] = [];

  newCustomer: Customer = {
    id: '',
    name: '',
    email: '',
    location: '',
    customer_id: '',
  };

  ngOnInit(): void {
    this.customerService.get().subscribe((data) => {
      this.customer = data;
    });
  }

  addCustomer() {
    this.customerService.add(this.newCustomer).subscribe({
      next: (saved) => {
        this.customer.push(saved);
        this.newCustomer = {
          name: '',
          location: '',
          email: '',
          id: '',
          customer_id: '',
        };
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
          (customer) => customer.id !== id
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  updateCustomer(id: any) {}
}
