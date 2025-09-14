import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CustomerService } from '../services/customer.service';
import { ItemService } from '../services/item.service';
import { MasterService } from '../services/master.service';
import { Assign } from '../models/assignment.model';
import { AssignmentRequest } from '../models/AssignRequest.model';
import { error } from 'console';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private empService: EmployeeService,
    private custService: CustomerService,
    private itemService: ItemService,
    private masterService: MasterService
  ) {}

  customers: any[] = [];
  employees: any[] = [];
  items: any[] = [];

  assignment: Assign[] = [];

  ngOnInit(): void {
    // getting assignment-lists

    this.masterService
      .getAssignment()
      .subscribe((data: Assign[]) => {
        this.assignment= data
      }
      );

    // getting-selection-lists
    this.custService.get().subscribe((data) => (this.customers = data));

    this.empService.getEmployee().subscribe((data) => (this.employees = data));

    this.itemService.get().subscribe((data) => (this.items = data));
  }

  selectedCustomerId!: number;
  selectedEmployeeId!: number;
  selectedItemId!: number;

  AssignedData:  Assign[]=[];

  onAssign() {
    const masterId = {
      customerId: this.selectedCustomerId,
      employeeId: this.selectedEmployeeId,
      itemId: this.selectedItemId,
    };

    this.masterService.assignService(masterId).subscribe({
      next: (data: any) => {
        console.log('Assignment successful');
        // 3. Re-fetch the assignment list after a successful API call
        
      },
      error: (err) => {
        console.error('Assignment failed', err);
      }
    });
  }
}
