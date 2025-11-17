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

  // --- Department ---
  private departmentSource = new BehaviorSubject<Department[]>([])
  department$ = this.departmentSource.asObservable()
  // ADDED: This "getter" is needed by your component
  public get currentDepartmentsValue(): Department[] {
    return this.departmentSource.getValue();
  }

  // --- Project ---
  private projectSource = new BehaviorSubject<Project[]>([])
  project$ = this.projectSource.asObservable();
  // ADDED: This "getter" is needed by your component
  public get currentProjectsValue(): Project[] {
    return this.projectSource.getValue();
  }

  
  // --- Organization ---
  private organziationSource = new BehaviorSubject<Organization[]>([])
  organization$ = this.organziationSource.asObservable();
  // ADDED: This "getter" is needed by your component
  public get currentOrganizationsValue(): Organization[] {
    return this.organziationSource.getValue();
  }

  // --- ADDED: Assignment State ---
  // This is needed to update your table in real-time
  private assignmentListSource = new BehaviorSubject<Assignment[]>([]);
  public assignmentList$ = this.assignmentListSource.asObservable();


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
    return this.http.post<Assignment>(`${this.apiUrl}/assignments`, assignment)
  }

  // Renamed from 'getAssignment' and added .tap()
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}/assignments`).pipe(
      tap(data => {
        // This broadcasts the new list to your table
        this.assignmentListSource.next(data);
      })
    );
  }

  deleteAssignment(id: number) {
    return this.http.delete(`${this.apiUrl}/assignments/${id}`, { responseType: 'text' });
  }

  



}