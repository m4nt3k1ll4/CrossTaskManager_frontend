import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private httpClient = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor() { }

  getTask(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  addTask(task: Task): Observable<Task[]> {
    return this.httpClient.post<Task[]>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(task: Task, id?: number): Observable<Task[]> {
    return this.httpClient.put<Task[]>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<Task[]> {
    return this.httpClient.delete<Task[]>(`${this.apiUrl}/tasks/${id}`);
  }

}
