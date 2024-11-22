import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-task',
  standalone: true,
  providers: [TaskService],
  imports: [
    RouterLink,
    NgFor,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  showForm: boolean = false;
  tasks: Task[] = [];
  myForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
  ) {
    //this.initForm();
  }
ngOnInit(): void {
  this.getTask();
}
initForm(){}

getTask(){
  this.loading = true;
  this.taskService.getTask().subscribe({
    next: (response) => {
      console.log(response);
      this.tasks = response;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching tasks:', err);
    },
  });
}
}

