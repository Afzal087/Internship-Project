import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Removed unused OnInit
import { Department } from '../models/Department.model';
import { Project } from '../models/Project.model';
import { Organization } from '../models/Organization.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api'

  
  private departmentSource = new BehaviorSubject<Department[]>([])
  department$ = this.departmentSource.asObservable()
  
  public get currentDepartmentsValue(): Department[] {
    return this.departmentSource.getValue();
  }

  private projectSource = new BehaviorSubject<Project[]>([])
  project$ = this.projectSource.asObservable();
  public get currentProjectsValue(): Project[] {
    return this.projectSource.getValue();
  }

  
  
  private organziationSource = new BehaviorSubject<Organization[]>([])
  organization$ = this.organziationSource.asObservable();
  
  public get currentOrganizationsValue(): Organization[] {
    return this.organziationSource.getValue();
  }


  private assignmentList = new BehaviorSubject<Assignment[]>([]);
  public assignmentList$ = this.assignmentList.asObservable();


  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`).pipe(
      tap(data => {
        this.departmentSource.next(data);
      })
    )
  }

  addDepartment(department: Department) {
    return this.http.post<Department>(`${this.apiUrl}/departments`, department)
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.apiUrl}/departments/${id}`, { responseType: 'text' });
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      tap(data => {
        this.projectSource.next(data);
      })
    )
  }

  addProject(project: Project) {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project)
  }

  deleteProject(id: number) {
    return this.http.delete(`${this.apiUrl}/projects/${id}`, { responseType: 'text' })
  }

  getAllOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${this.apiUrl}/organizations`).pipe(
      tap(data => {
        this.organziationSource.next(data)
      })
    )
  }

  addOrganization(organization: Organization) {
    return this.http.post<Organization>(`${this.apiUrl}/organizations`, organization)
  }

  deleteOrganization(id: number) {
    return this.http.delete(`${this.apiUrl}/organizations/${id}`, { responseType: 'text' })
  }

  
  // --- UPDATED: Assignment Functions ---

  // Renamed from 'saveAssignment' to 'createAssignment' to match your component's call
  createAssignment(assignment: any): Observable<Assignment> { // Use 'any' for the payload
    console.log('Creating assignment:', assignment);
    return this.http.post<Assignment>(`${this.apiUrl}/assignments`, assignment)
  }

 
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}/assignments`).pipe(
      tap(data => {
        this.assignmentList.next(data);
      })
    );
  }

  deleteAssignment(id: number) {
    return this.http.delete(`${this.apiUrl}/assignments/${id}`, { responseType: 'text' });
  }

  



}