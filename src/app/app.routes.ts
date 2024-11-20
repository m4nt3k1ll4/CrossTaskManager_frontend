import { AppComponent } from './app.component';
import { TaskAssignComponent } from './pages/task-assing/task-assign.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { TaskComponent } from './pages/task/task.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent, canActivate: [authGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'task', component: TaskComponent },
      { path: 'task-assign/:id', component: TaskFormComponent },
      { path: 'task-assign', component: TaskAssignComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

