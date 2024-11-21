import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient)
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor() { }
  getEmployees(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`);
  }

  addEmployees(user: User): Observable<User[]> {
  return this.httpClient.post<User[]>(`${this.apiUrl}/users`, user);
}

  updateEmployees(employee: User,id?: number){
    return this.httpClient.put(`${this.apiUrl}/users/${id}`, employee)
  }

  deleteEmployees(id: number): Observable<User[]> {
    return this.httpClient.delete<User[]>(`${this.apiUrl}/users/${id}`);
  }
}
