import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { TestComponent } from './test/test.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
    {path: '',redirectTo:'/login',pathMatch: 'full' },
    {path:'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot', component: ForgotComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path:'employee', component: EmployeeComponent}
];
// ,canActivate:[AuthGuard]