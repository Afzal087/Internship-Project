import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-employee-list',
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  constructor(private router : Router){}
employees = [
  {id:1,employeeCode:'E001' ,name:'Mohd Afzal', position:'Developer', department:'IT'},
  {id:2,employeeCode:'E002' ,name:'John Doe', position:'Manager', department:'HR'},
  {id:3,employeeCode:'E003', name:'Jane Smith', position:'Analyst', department:'Finance'},
];

onView(employeeId:number){
 this.router.navigate(['employee',employeeId]);
}
onDelete(){}
onEdit(){}

}
