import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Priority, Task } from '../../models/task.model';
import Swal from 'sweetalert2';
import { Comment } from '../../models/comment.model';
import { Image } from '../../models/image.model';
import { UserTask } from '../../models/user-task.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-task',
  standalone: true,
  providers: [TaskService,
             AuthService],
  imports: [
    NgFor,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DateFormatPipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  showForm: boolean = false;
  tasks: Task[] = [];
  myForm!: FormGroup;
  loading: boolean = false;

  priorityOptions = [
    {label: 'low', value:Priority.Low},
    {label:'medium', value:Priority.Medium},
    {label:'high', value:Priority.High},
  ];

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
  ) {
    this.initForm();
  }
  showLink(scopeToEvaluate : string){
    return this.authService.hasScope(scopeToEvaluate)
   }
  ngOnInit(): void {
    this.getTask();
  }
  initForm(
    id?: number,
    title?: string,
    description?: string,
    priority?: Priority,
    due_date?: Date,
    comments?: Comment,
    images?: Image
  ) {
    this.myForm = this.formBuilder.group({
      id: [id],
      title: [title],
      description: [description],
      priority: [priority ],
      due_date: [due_date],
      comments: [comments],
      images: [images],
    });
  }

  getTask() {
    this.loading = true;
    this.taskService.getTask().subscribe({
      next: (response) => {
        //console.log(response);
        this.tasks = response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      },
    });
  }
  initTask() {
    this.showForm = true;
    this.initForm();
  }

  close() {
    this.showForm = false;
  }


  formSubmitTask(form: FormGroup) {
    //console.log(form);

    const dueDate = form.value.due_date;

    const task: Task = {
      'id': form.value.id,
      'title': form.value.title,
      'description': form.value.description,
      'priority': form.value.priority,
      'due_date': new Date(dueDate),
      'comments': form.value.comments,
      'images': form.value.images,
    };
    //console.log(task);
    if (form.value.id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this task?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.taskService.updateTask(task, form.value.id).subscribe(
            (data) => {
              this.getTask();
              //console.log(data);
              this.close();
            },
            (error) => {
              console.error('Error updating task:', error);
            }
          )
        }
      });
    } else {
      this.taskService.addTask(task).subscribe(
        (data) => {
          this.getTask();
          //console.log(data);
          this.close();
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    }
  }
  updateTask(task: Task) {
    this.initForm(task.id, task.title, task.description, task.priority, task.due_date);
    this.showForm = true;
  }


  deleteTask(id: number = 0): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Task?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(
          (data) => {
            this.getTask();
            //console.log(data);
          },
          (error) => {
            console.error('Error deleting task:', error);
          }
        );
      }
    })
  }
}
