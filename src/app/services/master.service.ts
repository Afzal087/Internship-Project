import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/Department.model';
import { Project } from '../models/Project.model';
import { Organization } from '../models/Organization.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  // Replace with your API endpoint

  constructor(private http: HttpClient) { }

 
}
