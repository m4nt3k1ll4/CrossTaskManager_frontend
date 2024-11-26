import { DashboardHeadquarter } from './dashboard-headquarter.model';

export class DashboardCEOResponse {
  headquarters: DashboardHeadquarter[];

  constructor(data: any) {
    this.headquarters = (data.headquarters || []).map(
      (hq: any) => new DashboardHeadquarter(hq)
    );
  }
}
