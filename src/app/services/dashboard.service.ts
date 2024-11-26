import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { DashboardCEOResponse } from '../models/dashboard-ceoresponse.model';
import { DashboardManagerResponse } from '../models/dashboard-manager-response.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api';

  constructor() { }

  getCEOData(): Observable<DashboardCEOResponse> {
    return this.httpClient.get(`${this.apiUrl}/dashboard/ceo`).pipe(
      map((response: any) => new DashboardCEOResponse(response))
    );
  }

  getManagerData(): Observable<DashboardManagerResponse> {
    return this.httpClient.get(`${this.apiUrl}/dashboard/manager`).pipe(
      map((response: any) => new DashboardManagerResponse(response))
    );
  }
}
