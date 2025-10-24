import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  
  private apiUrl = "http://localhost:8080/api/employees"
  
  private allEmployee: Employee[] = [];

  private employeeSubject = new BehaviorSubject<Employee[]>([]);
  public employee$ = this.employeeSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  loadAllEmployees(): void{
    this.http.get<Employee[]>(this.apiUrl).subscribe((data) => {
      console.log('Loaded',data.length, 'employees from backend');

      this.allEmployee = data;
      this.employeeSubject.next(data);
    },
    (error) => {
      console.error('Failed to load employees', error);
    });
  }


    searchEmployees(keyword: string): void {
    if (!keyword || keyword.trim() === '') {
      // No keyword, show all employees
      this.employeeSubject.next(this.allEmployee);
      return;
    }

    // Filter the stored array
    const searchTerm = keyword.toLowerCase();
    const filtered = this.allEmployee.filter(emp => 
      emp.firstName?.toLowerCase().includes(searchTerm) ||
      emp.lastName?.toLowerCase().includes(searchTerm) ||
      emp.email?.toLowerCase().includes(searchTerm) ||
      emp.employeeCode?.toLowerCase().includes(searchTerm) ||
      emp.department?.toLowerCase().includes(searchTerm) ||
      emp.position?.toLowerCase().includes(searchTerm)
    );

    console.log(`🔍 Found ${filtered.length} results for "${keyword}"`);
    this.employeeSubject.next(filtered);  // Broadcast filtered results
  }

  // ✅ NEW: Clear search and show all
  clearSearch(): void {
    console.log('🔄 Showing all employees');
    this.employeeSubject.next(this.allEmployee);
  }

  createEmployee(info: Employee): Observable<Employee> {
  const formData = new FormData();

  (Object.keys(info) as (keyof Employee)[]).forEach(key => {
    const value = info[key];
    if (value !== null && value !== undefined && !(value instanceof File)) {
      formData.append(key, value as string);
    }
  });


  if (info.offerLetter instanceof File) formData.append('offerLetter', info.offerLetter);
  if (info.idProof instanceof File) formData.append('idProof', info.idProof);

  return this.http.post<Employee>(this.apiUrl, formData);
}
  getEmployeeById(id:number): Observable <Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }
  

  deleteEmployee(id: number) : Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log("Deleting user with URL:", url);
    return this.http.delete<void>(url);
  }

  updateEmployee(info: Employee): Observable<Employee> {
  const formData = new FormData();

  (Object.keys(info) as (keyof Employee)[]).forEach(key => {
    const value = info[key];
    if (value !== null && value !== undefined && !(value instanceof File)) {
      formData.append(key, value as string);
    }
  });

  if (info.offerLetter instanceof File) formData.append('offerLetter', info.offerLetter);
  if (info.idProof instanceof File) formData.append('idProof', info.idProof);

  return this.http.patch<Employee>(`${this.apiUrl}/${info.employeeId}`, formData);
}


}
