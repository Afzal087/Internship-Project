import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { LoginResponse } from '../models/loginResponse';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    
    const savedUserId = localStorage.getItem('userId');
    const savedUserRole = localStorage.getItem('userRoles');
  if (savedUserId) {
    console.log("Re-syncing permissions for existing session...");
    this.getAllPermissionByUserId(savedUserId);
    if(savedUserRole){
      const parsedRoles: Role[] = JSON.parse(savedUserRole);
      this.allRoles = parsedRoles;
      this.roleSubject.next(this.allRoles); // This pushes roles back to role$
      console.log("✅ Roles restored from storage:", this.allRoles);
    }

  }
   }


  //Fetched Roles for DOM Control
  private allRoles: Role[] = [];
  private roleSubject = new BehaviorSubject<Role[]>([]);
  public role$ = this.roleSubject.asObservable();

  //Fetched Permissions for DOM Control
  private allPermissions: Permission[] = [];

  
  private permissionSubject = new BehaviorSubject<Permission[]>([])
  public permission$ = this.permissionSubject.asObservable();

  


  register(userDetails: User) {
    return this.http.post<User>(`${this.apiUrl}/register`, userDetails);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password });
  }

  saveAuth(res: LoginResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', String(res.userId));
    localStorage.setItem('email',res.email)
    localStorage.setItem('userRoles', JSON.stringify(res.roles));
    this.setRoles(res.roles);
  }

  setRoles(roles: Role[]) {
    this.allRoles = [...roles];
    this.roleSubject.next(this.allRoles);
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.getAllPermissionByUserId(userId);
    }
  }

  private getAllPermissionByUserId(userId: string) {
    this.http.get<Permission[]>(`${this.apiUrl}/auth/role-permission/all-permission`, {
      params: new HttpParams().set('userId', userId)
    }).subscribe({
      next: (perms) => {
        this.allPermissions = perms;
        this.permissionSubject.next(this.allPermissions);
      },
      error: (err) => console.error('Failed to fetch permissions', err)
    });
  }

  



  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasPermission(permissionName: string): boolean {
    return this.allPermissions.some(p => p.permission === permissionName);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token !== null && token !== '') {
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
  }
}
