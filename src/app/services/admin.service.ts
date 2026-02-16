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
import { RoleMapping } from '../models/Role.Mapping';

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


    mapRoleAndPermission(payload:RoleMapping):Observable<RoleMapping>{
      return this.http.post<RoleMapping>(`${this.apiUrl}/auth/role/assign/permission/new`,payload)
    }

    addPermission(payload:Permission):Observable<string>{
      return this.http.post(`${this.apiUrl}/auth/permission/add-permission`,payload,{
          responseType : 'text'
      })
    }

     deletePermission(id:string):Observable<any>{
        return this.http.delete(`${this.apiUrl}/auth/permission/delete-permission/${id}`)
    }
    addRole(){}

    getAllRoles():Observable<Role[]>{
      return this.http.get<Role[]>(`${this.apiUrl}/auth/role/all-role`);
                                                      
    }

   updateRole(payload: RoleMapping): Observable<string> {
    return this.http.patch(`${this.apiUrl}/auth/role-permission/update-role-permissions`, payload, {
        responseType: 'text' 
    });
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
      return this.http.delete(`${this.apiUrl}/auth/user-role/delete-assignment/userid/${userRole.userId}/roleid/${userRole.roleId}`)
    }
    

    assignPermissions(){}
    assignRoles(){}

   
    deleteRole(id:string):Observable<string>{
      console.log("recivevd", id)
      return this.http.delete(`${this.apiUrl}/auth/role/delete-role/${id}`,{
        responseType : 'text'
      })
    }

    
}
