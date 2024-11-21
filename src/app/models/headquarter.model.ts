export class Headquarter {
  id: number;
  name: string;
  ceo_id: number;
  manager_id: number;
  manager: Manager;

  constructor(json: any = {}) {
    this.id = json.id || 0;
    this.name = json.name || '';
    this.ceo_id = json.ceo_id || 0;
    this.manager_id = json.manager_id || 0;
    this.manager = json.manager ? new Manager(json.manager) : new Manager();
  }
}

export class Manager {
  id: number;
  name: string;
  email: string;
  role_id: number;

  constructor(json: any = {}) {
    this.id = json.id || 0;
    this.name = json.name || '';
    this.email = json.email || '';
    this.role_id = json.role_id || 0;
  }
}


