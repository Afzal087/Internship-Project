import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project.model';
import { AssignmentService } from '../../services/assignment.service';
import { FormsModule } from "@angular/forms";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-projects',
  imports: [FormsModule,CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  allProjects$ : Observable<Project[]>;
  constructor(private service: AssignmentService ){
    this.allProjects$ = this.service.project$;
  }

  project: Project = {
    projectName: '',
   }

ngOnInit(): void {
  this.service.getAllProjects().subscribe();
}

getProject(){
  this.service.getAllProjects().subscribe();
} 

addProject(){ 
  this.service.addProject(this.project).subscribe({
    next:(savedProject)=>{
      alert("Project Saved SuccessFull");
      
      this.project = {
        projectName: ''} 
        this.service.getAllProjects().subscribe();
        },
  error:(err)=>{
    console.error('Error saving project:', err);
  }
  })    

  

} 

deleteProject(id:number){
    this.service.deleteProject(id).subscribe({
      next:(responseMessage)=>{
        console.log(responseMessage);
        alert("Project deleted");
        this.service.getAllProjects().subscribe();  
      },
      error:(err)=>{
        console.error('Error deleting project:', err);
      }
    })
  
  } 
}
