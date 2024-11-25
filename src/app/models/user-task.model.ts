export class UserTask {
    id: number;
    user_id: string;
    task_id: string;
    status: string;
    user_name: string;
    task_title: string;

    constructor(json: any = {}) {
      this.id = json.id || 0;
      this.user_id = json.user_id || '';
      this.task_id = json.task_id || '';
      this.status = json.status || '';
      this.user_name = json.user_name || '';
      this.task_title = json.task_title || '';
    }
}

export class User {
  id: number;
  name: string;

  constructor(json: any = {}) {
    this.id = json.id || 0;
    this.name = json.name || '';
  }
}

export class Task {
  id: number;
  title: string;

  constructor(json: any = {}) {
    this.id = json.id || 0;
    this.title = json.title || '';
  }
}
