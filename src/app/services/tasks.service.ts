import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiURL = 'https://task-manager-backend-gnmj.onrender.com/task'
  constructor(private http: HttpClient) { }

  getTaskById(taskId: string): Observable<any> {
    return this.http.get(this.apiURL+"/"+taskId);
  }
  createTask(taskData: any): Observable<any> {
    return this.http.post(this.apiURL, taskData);
  }
  updateTask(taskData: any, taskId: string): Observable<any> {
    return this.http.put(this.apiURL+"/"+taskId, taskData);
  }
  deleteTask(taskId: string) {
    return this.http.delete(this.apiURL+"/"+taskId);
  }
  filterAndSortTasks(filters: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiURL}/filters`, filters);
  }
}
