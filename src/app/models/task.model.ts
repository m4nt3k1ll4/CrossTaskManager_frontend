export class Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  due_date: Date | null;



  constructor(json: any = {}) {
      this.id = json.id || 0;
      this.title = json.title || '';
      this.description = json.description || '';
      this.priority = json.priority || 'low';
      this.due_date = json.due_date ? new Date(json.due_date) : null;
  }
}


