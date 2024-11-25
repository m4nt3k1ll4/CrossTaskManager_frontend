import { TaskService } from './../../services/task.service';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserTask, User, Task } from '../../models/user-task.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-assign',
  standalone: true,
  providers: [TaskService],
  imports: [
    //NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-assign.component.html',
  styleUrl: './task-assign.component.css'
})
export class TaskAssignComponent {
  userTasks: UserTask[] = [];
  tasks : Task[] = [];
  users : User[] = [];
  myForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private TaskService: TaskService,
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.getAssignTasks();
    this.getUsersAndTask();
  }

  initForm(
    id?: number,
    user_id?: string,
    task_id?: string,
    user?: User,
    task?: Task,
  ) {
    this.myForm = this.formBuilder.group({
      id: [id],
      user_id: [user_id],
      task_id: [task_id],
      user: [user],
      task: [task]
    })
  }


  getUsersAndTask() {
    this.TaskService.getUsersAndTask().subscribe(
      (res: {tasks : Task[]; users : User[]}) => {
        console.log(res);
        this.tasks = res.tasks;
        this.users = res.users;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAssignTasks() {
    this.loading = true;
    this.TaskService.getAssignTask().subscribe(
      (res: UserTask[]) => {
        console.log(res);
        this.userTasks = res;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
  formAssignTask(form: FormGroup) {
    const userTask: UserTask = {
      id: form.value.id,
      user_id: form.value.user_id,
      task_id: form.value.task_id,
      status: form.value.status,
      user_name: form.value.user.name,
      task_title: form.value.task.title,
    };
    this.TaskService.AssignTask(userTask).subscribe(
      (data) => {
        console.log('Task assigned successfully:', data);
      },
      (error) => {
        console.error('Error assigning task:', error);
      }
    );
  }
  unassignTask(id: number = 0):void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to unassign this Task?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.TaskService.deleteTask(id).subscribe(
          (data) => {
            this.getAssignTasks();
            console.log(data);
          },
          (error) => {
            console.error('Error unassigning task:', error);
          }
        );
      }
    });
  }
}
