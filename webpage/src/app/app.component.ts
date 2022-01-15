import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Task{
  constructor(
    public id: number,
    public description: string,
    public responsible: string,
    public date: Date,
  ){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  task!: string;
  response!: string;
  constructor(private httpClient: HttpClient){}
  ngOnInit(): void {
    this.postTask("Hola","prueba");
    this.postTask("Hola","prueba");
    this.postTask("Hola","prueba");
    this.getTasks();
  }
  title = 'demoWebpage';
  postDesc="";
  postResp="";
  patchID=0;
  patchDesc="";
  patchResp="";
  getID=0;
  deleteID=0;
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
    this.httpClient.get<any>("http://localhost:3000/tasks").subscribe(
      response =>{
        this.task=JSON.stringify(response)
      }
    )
  }

getbyIDTasks(id:number){
    this.httpClient.get<any>("http://localhost:3000/tasks/"+id).subscribe(
      response =>{
        this.response=JSON.stringify(response)
      }
    )
  }

  postTask(desc:string,resp:string){
    this.httpClient.post<any>("http://localhost:3000/tasks",{description:desc,responsible:resp}).subscribe(
      response =>{
        this.response=JSON.stringify(response)
    })
  }

  updateTask(id:number,desc:string,resp:string){
    this.httpClient.patch<any>("http://localhost:3000/tasks/"+id,{description:desc,responsible:resp}).subscribe(
      response =>{
        this.response=JSON.stringify(response)
    })
  }

  deleteTask(id:number){
    this.httpClient.delete<any>("http://localhost:3000/tasks/"+id).subscribe(
      response =>{
        this.response=JSON.stringify(response)
    })
  }
}
