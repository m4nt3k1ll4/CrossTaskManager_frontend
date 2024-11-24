import { User } from "./user.model";

export class Headquarter {
  id: number;
  name: string;
  manager_id: string;
  manager?: User;

  constructor(json: any = {}) {
    this.id = json.id || 0;
    this.name = json.name || '';
    this.manager_id = json.manager_id || '';
    this.manager = json.user ? new User(json.manager) : undefined;
  }
}



