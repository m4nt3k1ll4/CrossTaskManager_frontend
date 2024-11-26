export class DashboardManagerResponse {
  headquarter_name: string;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  pending_users: { [key: string]: { task_title: string; user: string } };

  constructor(data: any) {
    this.headquarter_name = data.headquarter_name || '';
    this.total_tasks = data.total_tasks || 0;
    this.completed_tasks = data.completed_tasks || 0;
    this.pending_tasks = data.pending_tasks || 0;
    this.pending_users = data.pending_users || {};
  }
  getPendingUsersArray() {
    return Object.values(this.pending_users);
  }
}
