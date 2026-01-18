import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(userDetails: User) {
    return this.http.post<User>(`${this.apiUrl}/register`, userDetails);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
  }

  saveAuth(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

   getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isLoggedIn(): boolean {
    const token = this.getToken();
    if(token !== null && token !== ''){
        return true;
    }
    else{
      return false;
    }
  }
  
    isAdmin(): boolean {
    if (localStorage.getItem('role')) {
       if(localStorage.getItem('role') === 'ADMIN'){
        return true;
       }
    }
    return false;
  }

  // setLoginStatus(status: boolean) {
  //   sessionStorage.setItem('loggedIn', status ? 'true' : 'false');
  // }

  // setSessionData(role: string, userId: string) {
  //   sessionStorage.setItem('role', role);
  //   sessionStorage.setItem('userId', userId);
  // }

  // getRole(): string | null {
  //   return sessionStorage.getItem('role');
  // }

  // isAdmin(): boolean {
  //   return this.getRole() === 'ADMIN';
  // }

  logout() {
    localStorage.clear();
  }
}
