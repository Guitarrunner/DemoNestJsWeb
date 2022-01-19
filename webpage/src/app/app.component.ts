import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { TaskService } from './app.service';
import { Task } from './interfaces/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  readonly title = 'demoWebpage';

  tasks$!: Observable<Task[]>;

  postDesc = '';
  postResp = '';
  patchID = 0;
  patchDesc = '';
  patchResp = '';
  getID = 0;
  deleteID = 0;

  formPost!: FormGroup;
  formGet!: FormGroup;
  formPatch!: FormGroup;
  formDelete!: FormGroup;

  constructor(
    public taskService: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();

    this.formPost = this.formBuilder.group({
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      responsible: [null, Validators.required],
    });

    this.formGet = this.formBuilder.group({
      id: [null, [Validators.required]],
    });

    this.formPatch = this.formBuilder.group({
      id: [null, [Validators.required]],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      responsible: [null, Validators.required],
    });

    this.formDelete = this.formBuilder.group({
      id: [null, [Validators.required]],
    });
  }

  onSubmitPost(form: FormGroup) {
    console.log(form);
    const {
      value: { description, responsible },
    } = form;
    this.postTask(description, responsible);
  }

  onSubmitGet(form: FormGroup) {
    console.log(form);
    const {
      value: { id },
    } = form;
    this.getbyIDTasks(id);
  }

  onSubmitPatch(form: FormGroup) {
    console.log(form);
    const {
      value: { id, description, responsible },
    } = form;
    this.updateTask(id, description, responsible);
  }

  onSubmitDelete(form: FormGroup) {
    console.log(form);
    const {
      value: { id },
    } = form;
    this.deleteTask(id);
  }

  getTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  getbyIDTasks(id: number) {
    this.tasks$ = this.taskService.getbyIDTasks(id).pipe(
      tap((response) => console.log(response)),
      switchMap(() => this.taskService.getbyIDTasks(id))
    );
  }

  /* let tmp = Number(id);
    if (!Number.isNaN(tmp)) {
      this.taskService.getbyIDTasks(tmp);
    } else {
      alert('Use números en el id!');
    }*/

  postTask(desc: string, resp: string) {
    this.tasks$ = this.taskService.postTask(desc, resp).pipe(
      tap((response) => console.log(response)),
      switchMap(() => this.taskService.getTasks())
    );
  }

  updateTask(id: number, desc: string, resp: string) {
    this.tasks$ = this.taskService.updateTask(id, desc, resp).pipe(
      tap((response) => console.log(response)),
      switchMap(() => this.taskService.getTasks())
    );
  }

  deleteTask(id: number) {
    this.tasks$ = this.taskService.deleteTask(id).pipe(
      tap((response) => console.log(response)),
      switchMap(() => this.taskService.getTasks())
    );
  }
}
