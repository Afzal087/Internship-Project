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
    console.log('Attempting login with email:', email);
    console.log('Attempting login with password:', password);
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

  setSessionData(role: string, userId: string) {
    console.log('Setting session data:', { role, userId }); 
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('userId', userId);
  }



  getRole(): string | null {  
    return sessionStorage.getItem('role')
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  

  logout() {
    this.setLoginStatus(false);
  } 
}