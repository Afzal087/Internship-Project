import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ItemComponent } from './item/item.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'employees', children: [
          { path: '', component: EmployeeListComponent }, // default = list
          { path: 'view/:employeeId', component: EmployeeViewComponent },
          { path: 'add' , component: EmployeeComponent},
          { path: 'edit/:employeeId', component: EmployeeEditComponent },
        ], },
      { path: 'customers', component: CustomersComponent },
      { path: 'item', component: ItemComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];
