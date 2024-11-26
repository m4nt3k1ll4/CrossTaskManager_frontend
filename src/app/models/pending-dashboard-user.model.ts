export class PendingDashboardUser {
  taskTitle: string;
  user: string;

  constructor(data: any) {
    this.taskTitle = data.task_title || '';
    this.user = data.user || '';
  }
}
