import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from './interfaces/task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  public task!: string;  
  public response!: string;
constructor(private httpClient: HttpClient){}
  getTasks(){
    this.httpClient.get<Task>(environment.url).subscribe(
      response =>{
        this.task=JSON.stringify(response)
      }
    );
  }

getbyIDTasks(id:number){
    this.httpClient.get<Task>(environment.url+id).subscribe(
      response =>{
        this.response=JSON.stringify(response)
        this.getTasks()
      }
    );
  }

  postTask(desc:string,resp:string){
    this.httpClient.post<Task>(environment.url,{description:desc,responsible:resp}).subscribe(
      response =>{
        this.response=JSON.stringify(response)
        this.getTasks()
    });
  }

  updateTask(id:number,desc:string,resp:string){
    this.httpClient.patch<Task>(environment.url+id,{description:desc,responsible:resp}).subscribe(
      response =>{
        this.response=JSON.stringify(response)
        this.getTasks()
    });
  }

  deleteTask(id:number){
    this.httpClient.delete<Task>(environment.url+id).subscribe(
      response =>{
        this.response=JSON.stringify(response)
        this.getTasks()
    });
  }}