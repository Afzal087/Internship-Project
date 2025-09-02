import { Injectable } from '@angular/core';
import { Users } from '../models/employee.model';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl = "http://localhost:8080/api/employees"

  constructor(private https: HttpClient) { }
  
  getEmployee(): Observable<Users[]> {
    return this.https.get<Users[]>(this.apiUrl);
  }

  createEmployee(user: Users): Observable<Users> {
    return this.https.post<Users>(this.apiUrl, user)
  }

  deleteEmployee(id: number) : Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log("Deleting user with URL:", url);
    return this.https.delete<void>(url);
  }

  updateEmployee(id:number): Observable<Users> {
    const url = `${this.apiUrl}/${id}`;
    return this.https.patch<Users>(url, this);
  }

}
