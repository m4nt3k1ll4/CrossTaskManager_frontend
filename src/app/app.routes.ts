import { TaskAssignComponent } from './pages/task-assing/task-assign.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { TaskComponent } from './pages/task/task.component';
import { authGuard } from './core/guards/auth.guard';
import { HeadquartersComponent } from './pages/headquarters/headquarters.component';
import { AdviserDashboardComponent } from './pages/manager-dashboard/adviser-dashboard.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent, canActivate: [authGuard], children: [
      { path: 'dashboard', component: DashboardComponent, data: { roles: ['ceo'] } },
      { path: 'employees', component: EmployeesComponent, data: { roles: ['ceo'] } },
      { path: 'headquarters', component: HeadquartersComponent, data: { roles: ['ceo'] } },
      { path: 'task', component: TaskComponent, data: { roles: ['ceo', 'manager'] } },
      { path: 'task-assign', component: TaskAssignComponent, data: { roles: ['ceo', 'manager'] } },
      { path: 'manager-dashboard', component: ManagerDashboardComponent, data: { roles: ['manager'] } },
      { path: 'adviser-view', component: AdviserDashboardComponent, data: { roles: ['adviser'] } },
      { path: 'adviser-task', component: TaskDetailComponent, data: { roles: ['adviser'] } },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];


