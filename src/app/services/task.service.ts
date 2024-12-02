import { Task } from '../models/task.model';
import { UserTask } from '../models/user-task.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';



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

  getUsersAndTask(): Observable<{tasks : Task[]; users : User[]}> {
    return this.httpClient.get<{tasks : Task[]; users : User[]}>(`${this.apiUrl}/tasks-view`);
  }
  getAssignTask(): Observable<UserTask[]>{
    return this.httpClient.get<UserTask[]>(`${this.apiUrl}/tasks-assigned`);
  }

  updateAssignTask(userTask: UserTask, id?:number): Observable<UserTask[]>{
    return this.httpClient.put<UserTask[]>(`${this.apiUrl}/tasks-assigned/${id}`, userTask);
  }

  AssignTask(userTask: UserTask): Observable<UserTask[]>{
    return this.httpClient.post<UserTask[]>(`${this.apiUrl}/tasks-assign`, userTask);
  }
  deleteAssignTask(id: number): Observable<UserTask[]>{
    return this.httpClient.delete<UserTask[]>(`${this.apiUrl}/tasks-unassign/${id}`);
  }

  getAssignTaskById(id : number): Observable<UserTask>{
    return this.httpClient.get<UserTask>(`${this.apiUrl}/tasks-assigned/${id}`);
  }

  postImages(id:number, file:File): Observable<any>{
    const fd = new FormData();
    fd.append('image', file, file.name );
    return this.httpClient.post<any>(`${this.apiUrl}/task-images/${id}`, fd);
  }

  deleteImage(taskId: number, imagePath: string): Observable<void> {
    const imageId = this.extractImageId(imagePath); // Extraer ID de la imagen del path.
    return this.httpClient.delete<void>(`${this.apiUrl}/task-images/${taskId}/${imageId}`);
  }

  updateAssignTaskStatus(userTask: UserTask, id: number): Observable<any> {
    const payload = { status: userTask.status };
    return this.httpClient.put<any>(`${this.apiUrl}/tasks-assigned/${id}`, payload);
  }


  private extractImageId(imagePath: string): string {
    return imagePath.split('/').pop() || '';
  }

}
