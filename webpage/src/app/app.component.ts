import { Component, OnInit } from '@angular/core';
import { TaskService } from './app.service';

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
  
  constructor(public taskService : TaskService){}
  
  ngOnInit(): void {
    this.taskService.postTask("Hola","prueba");
    this.taskService.postTask("Hola","prueba");
    this.taskService.postTask("Hola","prueba");
    this.taskService.getTasks();
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
    this.task = this.taskService.getTasks();
  }

  getbyIDTasks(id:number){
    this.response =  this.taskService.getbyIDTasks(id);
    }

  postTask(desc:string,resp:string){
    this.response =  this.taskService.postTask(desc,resp);
  }

  updateTask(id:number,desc:string,resp:string){
    this.response =  this.taskService.updateTask(id,desc,resp);
  }

  deleteTask(id:number){
   this.response =  this.taskService.deleteTask(id);
  }
}
