import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/Department.model';
import { AssignmentService } from '../../services/assignment.service';
import { FormsModule } from "@angular/forms";
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { error } from 'console';
@Component({
  selector: 'app-department',
  imports: [FormsModule , CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {

   allDepartments$ : Observable<Department[]>;

  constructor(private service: AssignmentService ){
    this.allDepartments$ = this.service.department$;
  }

 department: Department = {
  departmentName: '',
 }



  ngOnInit(): void {
    this.service.getAllDepartments().subscribe();
  }

  getDepartment(){
   this.service.getAllDepartments().subscribe();  
  }

  addDepartment(){
    console.log(this.department)
    this.service.addDepartment(this.department).subscribe({
      next:(savedDepartment)=>{
        alert("Department Saved SuccessFull");
     
        this.department = {
          departmentName: ''} 
             this.service.getAllDepartments().subscribe()
    },
    error:(err)=>{
      console.error('Error saving department:', err);
    }
    })

    }

    deleteDepartment(id : number){
        this.service.deleteDepartment(id).subscribe({
          next:(responseMessage)=>{
            console.log(responseMessage);
            alert("Department deleted");
            // this.getDepartment();
            this.service.getAllDepartments().subscribe();
          },
          error:(err)=>{
            console.error('Error deleting department:', err);
          }
        })
    }
}
