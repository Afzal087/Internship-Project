import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  login(email: string, password: string) {
    return this.http.post<boolean>(`${this.apiUrl}/login`, { email, password });
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  setLoginStatus(status: boolean) {
    sessionStorage.setItem('loggedIn', status ? 'true' : 'false');
  }

  logout() {
    this.setLoginStatus(false);
  } 
}