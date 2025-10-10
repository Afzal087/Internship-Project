import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';



@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}


  register(userDetails : User) {
    return this.http.post<User>(`${this.apiUrl}/register`, userDetails);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/login`, { email , password });
  }

 isLoggedIn(): boolean {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem('loggedIn') === 'true';
  }
  return false;
}


  setLoginStatus(status: boolean) {
    sessionStorage.setItem('loggedIn', status ? 'true' : 'false');
  }

  logout() {
    this.setLoginStatus(false);
  } 
}