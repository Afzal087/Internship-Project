import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}


  register(userDetails : User) {
    return this.http.post<User>(`${this.apiUrl}/register`, userDetails);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/login`, { email , password });
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