import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { UserService } from './user.service';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { Permission } from '../models/permission.model';
import { User } from '../models/user.model';
import { UserRequest } from '../models/userRequest.model';
import { ObjectEncodingOptions } from 'fs';
import { UserRole } from '../models/UserRole.model';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService,
    private userService: UserService,
  ) {}
   apiUrl = environment.apiUrl;
    
    getAllUsers():Observable<UserRequest[]>{
      return this.http.get<UserRequest[]>(`${this.apiUrl}/users`)
    }



    addPermission(){}
    addRole(){}

    getAllRoles():Observable<Role[]>{
      return this.http.get<Role[]>(`${this.apiUrl}/auth/role/all-role`);
                                                      
    }

    assignRole(userRole : UserRole){
      return this.http.post(`${this.apiUrl}/auth/user-role/assign-role`,userRole)
    }

    getRolesByUserId(userId : any):Observable<Role[]>{
        return this.http.get<Role[]>(`${this.apiUrl}/auth/user-role/user-roles/${userId}`,)
    }

    getAllPermissions():Observable<Permission[]>{
      return this.http.get<Permission[]>(`${this.apiUrl}/auth/permission/all-permission`);
    }

    deleteUserRole(userRole : UserRole){
      console.log("These are the ids for Deleteion", userRole)
      return this.http.delete(`${this.apiUrl}/auth/user-role/delete-assignment/userid/${userRole.userId}/roleid/${userRole.roleId}`)
    }
    

    assignPermissions(){}
    assignRoles(){}

    deletePermission(){}
    deleteRole(){}

    
}
