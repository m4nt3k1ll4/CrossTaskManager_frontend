import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { UserTask } from '../../models/user-task.model';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';



@Component({
  selector: 'app-task-detail',
  standalone: true,
  providers: [TaskService],
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  id: number = 0;
  sub!: Subscription;
  userTask?: UserTask;
  myForm!: FormGroup;
  selectedFile?: File;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getTask();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTask(): void {
    this.taskService.getAssignTaskById(this.id).subscribe(task => this.userTask = task);
  }
  initForm(){
    this.myForm = this.formBuilder.group({

    });
  }
  onFileSelected(event : Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = <File> input.files![0];
      console.log(this.selectedFile);
  }

  postImage(){
    this.taskService.postImages(this.id, this.selectedFile!).subscribe(
      response => {
        console.log('Image uploaded successfully!', response);
      },
      error => {
        console.log('Error during image upload!', error);
      }
    );
  }

}

