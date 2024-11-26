import { PendingDashboardUser } from './pending-dashboard-user.model';

export class DashboardHeadquarter {
  headquarterName: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  compliancePercentage: number;
  pendingUsers: PendingDashboardUser[];

  constructor(data: any) {
    this.headquarterName = data.headquarter_name || '';
    this.totalTasks = data.total_tasks || 0;
    this.completedTasks = data.completed_tasks || 0;
    this.pendingTasks = data.pending_tasks || 0;
    this.compliancePercentage = data.compliance_percentage || 0;
    this.pendingUsers = this.normalizePendingUsers(data.pending_users);
  }


  private normalizePendingUsers(pendingUsers: any): PendingDashboardUser[] {
    if (Array.isArray(pendingUsers)) {

      return pendingUsers.map((user: any) => new PendingDashboardUser(user));
    } else if (pendingUsers && typeof pendingUsers === 'object') {
      return Object.values(pendingUsers).map((user: any) => new PendingDashboardUser(user));
    }
    return [];
  }
}
