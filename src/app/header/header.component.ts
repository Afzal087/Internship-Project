import { Component, NgModule } from '@angular/core';
import { f } from "../../../node_modules/@angular/material/icon-module.d-COXCrhrh";
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatIconModule,FormsModule ,CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
isMenuOpen = false;

searchKeyword: string = '';
constructor(private employeeService : EmployeeService){}

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

onSearch():void{
  this.employeeService.searchEmployees(this.searchKeyword);
}
onClear():void {
  this.searchKeyword = '';
  this.employeeService.searchEmployees(this.searchKeyword);
}


}
