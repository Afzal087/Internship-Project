import { Injectable, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable , tap } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ExtraFields } from '../models/extraFields.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements OnInit {
  private apiUrl = 'http://localhost:8080/api/employees';

  private allEmployee: Employee[] = [];

  private employeeSubject = new BehaviorSubject<Employee[]>([]);

  public employee$ = this.employeeSubject.asObservable();

  public get currentEmployeesValue(): Employee[] {
    return this.employeeSubject.getValue();
  }
  
  constructor(private http: HttpClient) {}


  downloadEmployeeReport(employeeId: number): Observable<Blob> {
    const url = `${this.apiUrl}/${employeeId}/report`;
    return this.http.get(url, { responseType: 'blob' });
  }

  ngOnInit(): void {
    this.getEmployee().subscribe();
  }

  getJoiningDate(employeeId: number): boolean {
  const employee = this.allEmployee.find(
    emp => emp.employeeId === employeeId
  );

  if (!employee || !employee.dateOfJoining) {
    return false;
  }

  const currentDate = new Date();
  const joiningDateObj = new Date(employee.dateOfJoining);

  const yearsDiff = currentDate.getFullYear() - joiningDateObj.getFullYear();

  return (
    yearsDiff > 3 ||
    (
      yearsDiff === 3 &&
      currentDate.getMonth() >= joiningDateObj.getMonth() &&
      currentDate.getDate() >= joiningDateObj.getDate()
    )
  );
}


  getEmployee(): Observable<Employee[]>  {
   return  this.http.get<Employee[]>(this.apiUrl).pipe(
      tap(data =>{
       
        this.employeeSubject.next(data);
        this.allEmployee = data;
        
      })
    )
    
  }

  searchEmployees(keyword: string): void {
    if (!keyword || keyword.trim() === '') {
      // No keyword, show all employees
      this.employeeSubject.next(this.allEmployee);
      return;
    }

    // Filter the stored array
    const searchTerm = keyword.toLowerCase();
    const filtered = this.allEmployee.filter(
      (emp) =>
        emp.firstName?.toLowerCase().includes(searchTerm) ||
        emp.lastName?.toLowerCase().includes(searchTerm) ||
        emp.email?.toLowerCase().includes(searchTerm) ||
        emp.employeeCode?.toLowerCase().includes(searchTerm) ||
        emp.department?.toLowerCase().includes(searchTerm) ||
        emp.department?.toLowerCase().includes(searchTerm)
    );

    
    this.employeeSubject.next(filtered); // Broadcast filtered results
  }

  clearSearch(): void {
    
    this.employeeSubject.next(this.allEmployee);
  }

  createEmployee(info: Employee): Observable<Employee> {
    const formData = new FormData();

    (Object.keys(info) as (keyof Employee)[]).forEach((key) => {
      const value = info[key];
      if (value !== null && value !== undefined && !(value instanceof File)) {
        formData.append(key, value as string);
      }
    });

    if (info.offerLetter instanceof File)
      formData.append('offerLetter', info.offerLetter);
    if (info.idProof instanceof File) formData.append('idProof', info.idProof);

    return this.http.post<Employee>(this.apiUrl, formData);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  deleteEmployee(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
   
    return this.http.delete<void>(url);
  }

  updateEmployee(info: Employee, ): Observable<Employee> {
    const formData = new FormData();

    (Object.keys(info) as (keyof Employee)[]).forEach((key) => {
      const value = info[key];
      if (value !== null && value !== undefined && !(value instanceof File)) {
        formData.append(key, value as string);
      }
    });

    if (info.offerLetter instanceof File)
      formData.append('offerLetter', info.offerLetter);
    if (info.idProof instanceof File) 
      formData.append('idProof', info.idProof);

    return this.http.patch<Employee>(
      `${this.apiUrl}/${info.employeeId}`,
      formData
    );
  }

  promoteEmployee(info : Employee){
   
    return this.http.post<Employee>(`${this.apiUrl}/promotion/add`, info);
    
  }

  getPromotions(employeeId : number): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${this.apiUrl}/promotion/${employeeId}`);
  }
}
