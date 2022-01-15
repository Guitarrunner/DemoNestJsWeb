import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from './interfaces/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demoWebpage';
  
  public task!: string;  
  public response!: string;

  public postDesc="";
  public postResp="";
  public patchID=0;
  public patchDesc="";
  public patchResp="";
  public getID=0;
  public deleteID=0;
  
  constructor(private httpClient: HttpClient){}
  ngOnInit(): void {
    this.postTask("Hola","prueba");
    this.postTask("Hola","prueba");
    this.postTask("Hola","prueba");
    this.getTasks();
  }
  
  getValue(val: string,id:number){
    if (id==1)this.postDesc=val
    if (id==2)this.postResp=val
    if (id==3)this.getID=Number(val)
    if (id==4)this.patchID=Number(val)
    if (id==5)this.patchDesc=val
    if (id==6)this.patchResp=val
    if (id==7)this.deleteID=Number(val)
  }

  getTasks(){
    this.httpClient.get<Task>(environment.url).subscribe(
      response =>{
        this.task=JSON.stringify(response)
      }
    )
  }

getbyIDTasks(id:number){
    this.httpClient.get<Task>(environment.url+id).subscribe(
      response =>{
        this.response=JSON.stringify(response)
      }
    )
  }

  postTask(desc:string,resp:string){
    this.httpClient.post<Task>(environment.url,{description:desc,responsible:resp}).subscribe(
      response =>{
        this.response=JSON.stringify(response)
    })
  }

  updateTask(id:number,desc:string,resp:string){
    this.httpClient.patch<Task>(environment.url+id,{description:desc,responsible:resp}).subscribe(
      response =>{
        this.response=JSON.stringify(response)
    })
  }

  deleteTask(id:number){
    this.httpClient.delete<Task>(environment.url+id).subscribe(
      response =>{
        this.response=JSON.stringify(response)
    })
  }
}
