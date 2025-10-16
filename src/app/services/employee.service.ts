import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl = "http://localhost:8080/api/employees"

  constructor(private https: HttpClient) { }
  
  getEmployee(): Observable<Employee[]> {
    return this.https.get<Employee[]>(this.apiUrl);
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

  return this.https.post<Employee>(this.apiUrl, formData);
}
  

  deleteEmployee(id: number) : Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log("Deleting user with URL:", url);
    return this.https.delete<void>(url);
  }

  updateEmployee(id:number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.https.patch<Employee>(url, this);
  }

}
