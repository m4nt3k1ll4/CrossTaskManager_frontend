export class Image {
  id: number;
  status: string;

  constructor(json: any = {}) {
    this.id = json.id || 0;
    this.status = json.status || '';
  }
}
