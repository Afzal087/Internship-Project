import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../services/assignment.service';
import { FormsModule } from "@angular/forms";
import { Organization } from '../../models/Organization.model';
import { Observable } from 'rxjs';

import { error } from 'console';
import e from 'express';
import { CommonEngine } from '@angular/ssr/node';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-organization',
  imports: [FormsModule,CommonModule],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent implements OnInit {

  allOrganizations$ : Observable<Organization[]>;

constructor(private service: AssignmentService ){
      this.allOrganizations$ = service.organization$
}

 

organization : Organization = {
  organizationName: '',
}


  ngOnInit(): void {
    this.service.getAllOrganizations().subscribe();
  }

    getOrganization(){
    this.service.getAllOrganizations().subscribe(); 
  }

    addOrganization(){
    console.log(this.organization) 
    this.service.addOrganization(this.organization).subscribe({
      next:(savedOrganization)=>{
        alert("Organization Saved SuccessFull");
        
        this.organization = {
          organizationName: ''} 
          this.service.getAllOrganizations().subscribe();
    },
    error:(err)=>{
      console.error('Error saving organization:', err);
    }
    })

    }

   deleteOrganization(id : number){ 
    this.service.deleteOrganization(id).subscribe({
      next:(responseMessage)=>{
        console.log(responseMessage);
        alert("Organization deleted");
        this.service.getAllOrganizations().subscribe();
        
      },
      error:(err)=>{
        console.error('Error deleting organization:', err);
      }
    })
  } 



}
