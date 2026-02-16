import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { Permission } from '../../../models/permission.model';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { DialogService } from '../../../dialog-box/dialog-service.service';
import { RoleMapping } from '../../../models/Role.Mapping';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-role',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {

  constructor (private adminService: AdminService, private dialog :DialogService){}

  allRoles :Role[]=[]
  allPermissions : Permission[]=[]
  isCreating : Boolean = true




  newRoleName: string = '';
  selectedPermIds: string[] = [];

isEditing = false;
editRoleId = ''
editRoleName = '';

// This is called when the Pencil Icon is clicked
onPrepareUpdate(role: any) {
  this.isEditing = true;
  this.editRoleId = role.roleId;
  this.editRoleName = role.role;
  
  // 1. Populate Name Input
  this.newRoleName = role.role;
  
  // 2. Populate Checkboxes
  // Assuming role.permissions is an array of permission objects from your backend
  this.selectedPermIds = role.permissions.map((p: any) => p.permissionId);
  
  // 3. Scroll user to the sidebar if on mobile
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Reset form back to "Create Mode"
resetForm() {
  this.isEditing = false;
  this.editRoleId = '';
  this.newRoleName = '';
  this.selectedPermIds = [];
}

updateRole() {
  const payload = {
    roleId: this.editRoleId,
    role: this.newRoleName,
    permissions: this.selectedPermIds // Or however your backend expects it
  };
  
  this.adminService.updateRole(payload).subscribe({
    next: (res:any) => {
      console.log(res)
      this.dialog.show('Role Updated Successfully');
      this.loadAllRoles(); // Refresh the list
      this.resetForm();
    },
    error: (err:HttpErrorResponse) => this.dialog.show(err.error)
  });
}


deleteRole(id:string){
  this.adminService.deleteRole(id).subscribe({
    next : (res)=>{
        this.dialog.show(res)
        this.loadAllRoles();
    },
    error :(err:HttpErrorResponse)=>{
      this.dialog.show(err.message);
    }
  })
}
  ngOnInit(): void {
    this.loadAllPermissions()
    this.loadAllRoles()
  }

  loadAllRoles(){
    this.adminService.getAllRoles().subscribe({
      next : (res:Role[])=>{
        this.allRoles = res
      },
      error : (err)=>{
          this.dialog.show(err.message)
      }
    })
  }

  loadAllPermissions(){
     this.adminService.getAllPermissions().subscribe({
      next : (res:Permission[])=>{
        this.allPermissions = res
        
      },
      error : (err)=>{
          this.dialog.show(err.message)
      }
    })
  }

togglePermission(id: string) {
    if (this.selectedPermIds.includes(id)) {
      this.selectedPermIds = this.selectedPermIds.filter(p => p !== id);
    } else {
      this.selectedPermIds.push(id);
    }
  }


  saveRole(){
    const payload : RoleMapping ={
      role : this.newRoleName,
      permissions : this.selectedPermIds
    }

    this.adminService.mapRoleAndPermission(payload).subscribe({
      next : (res:any)=>{
        this.dialog.show(res)
        this.loadAllRoles()
      },
      error : (err:HttpErrorResponse)=>{
        this.dialog.show(err.message)
      }
    })
  }

}

