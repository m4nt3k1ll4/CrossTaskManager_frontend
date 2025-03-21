import { Headquarter } from "./headquarter.model";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role_id: string;
  role?: Role;
  headquarter_id: string;
  headquarter?: Headquarter;

  constructor(json: any = {}) {
      this.id = json.id || 0;
      this.name = json.name || '';
      this.email = json.email || '';
      this.password = json.password || '';
      this.role_id = json.role_id || 0;
      this.headquarter_id = json.headquarter_id ||'';

  }
}
export class Role {
  id: number;
  name: string;


  constructor(json: any = {}) {
      this.id = json.id || 0;
      this.name = json.name || '';
  }
}
