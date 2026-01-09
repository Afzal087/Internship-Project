import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveBalance, LeaveRequest, UnifiedAllLeaves } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  apiUrl = 'http://localhost:8080/api/leave';
  constructor(private http:HttpClient) { }

  submitLTARequest(LeaveData:LeaveRequest, employeeId: number): Observable<LeaveRequest>{
    return this.http.post<LeaveRequest>(`${this.apiUrl}/lta/${employeeId}`, LeaveData);
  }
  submitLeaveRequest(LeaveData:LeaveRequest, employeeId: number): Observable<LeaveRequest>{
    return this.http.post<LeaveRequest>(`${this.apiUrl}/${employeeId}`, LeaveData);
  }

  getAll(): Observable<UnifiedAllLeaves[]>{
    return this.http.get<UnifiedAllLeaves[]>(`${this.apiUrl}/all`);
  }

  setStatus(leaveId: number, status: string): Observable<LeaveRequest>{
    return this.http.patch<LeaveRequest>(`${this.apiUrl}/status/${leaveId}/${status}`, {});
  }
  getLeaveBalance(employeeId: number): Observable<LeaveBalance>{
    return this.http.get<LeaveBalance>(`${this.apiUrl}/balance/${employeeId}`);
  }


}
