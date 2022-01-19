import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from '../environments/environment';
import { Task } from './interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}
  getTasks() {
    return this.httpClient.get<Task[]>(environment.url).pipe(first());
  }

  getbyIDTasks(id: number) {
    return this.httpClient.get<Task[]>(environment.url + id).pipe(first());
  }

  postTask(desc: string, resp: string) {
    return this.httpClient
      .post<Task[]>(environment.url, { description: desc, responsible: resp })
      .pipe(first());
  }

  updateTask(id: number, desc: string, resp: string) {
    return this.httpClient
      .patch<Task[]>(environment.url + id, {
        description: desc,
        responsible: resp,
      })
      .pipe(first());
  }

  deleteTask(id: number) {
    return this.httpClient.delete<Task[]>(environment.url + id).pipe(first());
  }
}
