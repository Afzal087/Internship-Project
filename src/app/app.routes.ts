import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { FieldsComponent } from './fields/fields.component';
import { ProjectsComponent } from './fields/projects/projects.component';
import { OrganizationComponent } from './fields/organization/organization.component';
import { DepartmentComponent } from './fields/department/department.component';
import { redirectGuard } from './guard/redirectGuard';
import { PromotionComponent } from './employee/promotion/promotion.component';
import { LeaveComponent } from './LTA/leave.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { AdminComponent } from './features/rbac/admin/admin.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
// canActivate: [AuthGuard], paste in dashboard route

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: 'home', component: HomeComponent },
      {path: 'leaves', component: ManageLeaveComponent},
      {
        path: 'employees',
        children: [
          { path: '', component: EmployeeListComponent }, // default = list
          { path: 'view/:employeeId', component: EmployeeComponent },
          { path: 'add', component: EmployeeComponent },
          { path: 'promotion/:employeeId', component: PromotionComponent },
          { path: 'leave/:employeeId', component: LeaveComponent},
        ],
      },
      {
        path: 'fields',
        component: FieldsComponent,
        children: [
          { path: '', redirectTo: 'department', pathMatch: 'full' },
          { path: 'department', component: DepartmentComponent },
          { path: 'project', component: ProjectsComponent },
          { path: 'organization', component: OrganizationComponent },
        ],
      },
      

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: redirectGuard },
    ],
  },
  { path : 'admin', component: AdminComponent},
];
