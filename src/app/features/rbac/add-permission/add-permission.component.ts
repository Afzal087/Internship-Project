import { Component, OnInit } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../../dialog-box/dialog-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Permission } from '../../../models/permission.model';
import { nextTick } from 'node:process';

@Component({
  standalone : true,
  selector: 'app-add-permission',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-permission.component.html',
  styleUrl: './add-permission.component.css'
})
export class AddPermissionComponent implements OnInit {
constructor(private adminService: AdminService,private dialog : DialogService ){}

permissionsList : Permission[] =[]

perm :Permission ={
  permissionId : '',
  permission : ''
}


ngOnInit(): void {
  this.loadAllPermissions();

}

loadAllPermissions(){
     this.adminService.getAllPermissions().subscribe({
      next : (res:Permission[])=>{
        this.permissionsList = res 
      },
      error : (err)=>{
          this.dialog.show(err.message)
      }
    })
  }

savePermission(){
  this.adminService.addPermission(this.perm).subscribe({
    next: (res:any)=>{
      this.loadAllPermissions()
      this.dialog.show(res)
    },
    error : (err:HttpErrorResponse)=>{
      this.dialog.show(err.statusText)
    }
  })
}

onDelete(id:string){
  this.adminService.deletePermission(id).subscribe({
      next : (res)=>{
        this.loadAllPermissions()
        this.dialog.show(res)
      },
      error : (err:HttpErrorResponse)=>{
        this.dialog.show(err.message)
      }
  })
}



}

