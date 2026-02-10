// admin-panel.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { Permission } from '../../../models/permission.model';
import { Role } from '../../../models/role.model';
import { AdminService } from '../../../services/admin.service';
import { ResolveStart, RouterLinkActive, RouterOutlet } from '@angular/router';

import { UserRequest } from '../../../models/userRequest.model';
import { UserRole } from '../../../models/UserRole.model';
import { DialogService } from '../../../dialog-box/dialog-service.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'admin.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private dialog: DialogService,
  ) {}
  
  // RolesPermission
  allRoles: Role[] = [];
  allPermission: Permission[] = [];
  // UI Management
  currentRoles: Role[] = [];
  currentPermission: Permission[] = [];

  allUsers: UserRequest[] = [];
  assignedRoles: Role[] = [];

  userEmail = '';
  // BindDataObjectBlueprint
  UserRole: UserRole = {
    userId: '',
    roleId: '',
  };

  // Define the view state
  ngOnInit(): void {
    this.loadAllPermissions();
    this.loadAllRoles();
    this.loadUsers();
    this.initUser();
  }

  assignRole(roleId: string) {
    this.UserRole.roleId = roleId;
    this.adminService.assignRole(this.UserRole).subscribe({
      next: (res) => {
        this.onUserSelected(this.UserRole.userId);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.dialog.show(err.error.message);
        } else {
          this.dialog.show('An unexpected error occurred:');
        }
      },
    });
  }

  deleteRoleAssignment(roleId: string) {
    this.UserRole.roleId = roleId;
    this.adminService.deleteUserRole(this.UserRole).subscribe({
      next: (res) => {
        this.onUserSelected(this.UserRole.userId);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.dialog.show(err.error.message);
        } else {
          this.dialog.show('An unexpected error occurred:');
        }
      },
    });
  }

  onUserSelected(event: String) {
    const userId = String(event);
    this.adminService.getRolesByUserId(event).subscribe({
      next: (res) => {
        this.assignedRoles = res;
        this.UserRole.userId = userId;
      },
      error: (err) => {
        this.dialog.show(err);
      },
    });
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe((res) => {
      this.allUsers = res;
    });
  }

  initUser() {
    // Use a single subscription to keep things clean
    this.userService.permission$.subscribe({
      next: (perms) => {
        if (perms.length > 0) {
          this.currentPermission = perms;
        } else {
          console.log(
            '⏳ Permissions stream is currently empty, waiting for sync...',
          );
        }
      },
    });

    this.userService.role$.subscribe((roles) => {
      this.currentRoles = roles;
    });
  }

  loadAllPermissions() {
    this.adminService.getAllPermissions().subscribe((res: any) => {
      this.allPermission = res;
    });
  }
  loadAllRoles() {
    this.adminService.getAllRoles().subscribe((res: any) => {
      this.allRoles = res;
    });
  }
}
