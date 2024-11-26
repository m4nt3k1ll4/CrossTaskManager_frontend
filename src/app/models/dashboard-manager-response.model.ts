import { PendingDashboardUser } from './pending-dashboard-user.model';

export class DashboardManagerResponse {
  headquarterName: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  pendingUsers: PendingDashboardUser[];

  constructor(data: any) {
    this.headquarterName = data.headquarter_name || '';
    this.totalTasks = data.total_tasks || 0;
    this.completedTasks = data.completed_tasks || 0;
    this.pendingTasks = data.pending_tasks || 0;
    this.pendingUsers = (data.pending_users || []).map(
      (user: any) => new PendingDashboardUser(user)
    );
  }
}
