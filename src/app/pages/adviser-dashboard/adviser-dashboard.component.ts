import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { UserTask, User, Task } from '../../models/user-task.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-adviser-dashboard',
  standalone: true,
  providers: [TaskService],
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './adviser-dashboard.component.html',
  styleUrl: './adviser-dashboard.component.css'
})
export class AdviserDashboardComponent {
  userTasks: UserTask[] = [];
  tasks : Task[] = [];
  users : User[] = [];
  myForm!: FormGroup;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.initForm();
  }
  ngOnInit():void{
    this.getAssignedTasks();
  }
  initForm(
    id?: number,
    title?: string,
    status?: string,
  ){
    this.myForm = this.formBuilder.group({
      id: [id],
      title: [title],
      status: [status],
    });
  }

  getAssignedTasks(){
    this.taskService.getAssignTask().subscribe(
      (res: UserTask[]) => {
        console.log(res);
        this.userTasks = res;
      },
      (err) => {
        console.log(err);
   },

    );
  }
  calculateProgress(){

  }

  redirectTo(id:number){
    this.router.navigate([`adviser-task/${id}`]);
  }

}
