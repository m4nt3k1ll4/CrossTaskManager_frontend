import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Headquarter } from '../models/headquarter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor() { }

  getHeadquarters(): Observable<Headquarter[]> {
    return this.httpClient.get<Headquarter[]>(`${this.apiUrl}/headquarters`);
  }

  addHeadquarters(headquarter: Headquarter): Observable<Headquarter[]> {
    return this.httpClient.post<Headquarter[]>(`${this.apiUrl}/headquarters`, headquarter);
  }

  updateHeadquarters(headquarter: Headquarter, id?: number): Observable<Headquarter[]> {
    return this.httpClient.put<Headquarter[]>(`${this.apiUrl}/headquarters/${id}`, headquarter);
  }

  deleteHeadquarters(id: number): Observable<Headquarter[]> {
    return this.httpClient.delete<Headquarter[]>(`${this.apiUrl}/headquarters/${id}`);
  }

}
