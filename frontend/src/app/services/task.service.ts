import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../models/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
private apiUrl = `${environment.apiUrl}/tasks/`;

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        return throwError(() => new Error('Failed to load tasks. Please try again later.'));
      })
    );
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError((error) => {
        console.error('Error creating task:', error);
        return throwError(() => new Error('Failed to create task. Please try again.'));
      })
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${taskId}/`).pipe(
      catchError((error) => {
        console.error('Error deleting task:', error);
        return throwError(() => new Error('Failed to delete task. Please try again.'));
      })
    );
  }
  
  updateTask(taskId: number, updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}${taskId}/`, updatedTask).pipe(
      catchError((error) => {
        console.error('Error updating task:', error);
        return throwError(() => new Error('Failed to update task. Please try again.'));
      })
    );
  }
  

  getFilteredTasks(filterValue: string): Observable<Task[]> {
    let params = new HttpParams();
    if (filterValue) {
      params = params.set('search', filterValue);
    }
    return this.http.get<Task[]>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching filtered tasks:', error);
        return throwError(() => new Error('Failed to fetch filtered tasks.'));
      })
    );
  }
}
