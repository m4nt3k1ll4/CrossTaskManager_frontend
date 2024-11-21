export class Headquarter {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role: Role;

  constructor(json: any = {}) {
      this.id = json.id || 0;
      this.name = json.name || '';
      this.email = json.email || '';
      this.role_id = json.role_id || 0;
      this.role = new Role(json.role || {});
  }
}

export class Role {
  id: number;
  name: string;
  scopes: string;

  constructor(json: any = {}) {
      this.id = json.id || 0;
      this.name = json.name || '';
      this.scopes = json.scopes || '';
  }
}

export class Convert {
  public static toHeadquarter(json: string): Headquarter {
      return new Headquarter(JSON.parse(json));
  }

  public static headquarterToJson(value: Headquarter): string {
      return JSON.stringify(value);
  }
}

