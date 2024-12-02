import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { UserTask } from '../../models/user-task.model';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-detail',
  standalone: true,
  providers: [TaskService],
  imports: [CommonModule, FormsModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  id: number = 0;
  sub!: Subscription;
  userTask?: UserTask;
  myForm!: FormGroup;
  selectedFile?: File;
  uploadedImage? : string;
  taskStatus: string = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
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
    this.taskService.getAssignTaskById(this.id).subscribe(task => {
      this.userTask = task;
      this.taskStatus = task.status;
    });
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

  postImage(): void {
    if (this.selectedFile) {
      this.taskService.postImages(this.id, this.selectedFile).subscribe(
        response => {
          this.uploadedImage = response.image_path;
          console.log('Image uploaded successfully!', response);
        },
        error => {
          console.error('Error during image upload!', error);
        }
      );
    }
  }

  private extractImageId(imagePath: string): string {
    return imagePath.split('/').pop() || '';
  }

  deleteImage(): void {
    if (this.uploadedImage) {
      const imageId = this.extractImageId(this.uploadedImage);
      this.taskService.deleteImage(this.id, imageId).subscribe(
        () => {
          this.uploadedImage = undefined;
          console.log('Image deleted successfully!');
        },
        error => {
          console.error('Error deleting image:', error);
        }
      );
    }
  }

  saveChanges(): void {
    if (!this.userTask) {
      console.error('Task not loaded!');
      return;
    }


    if (this.selectedFile) {
      this.taskService.postImages(this.id, this.selectedFile).subscribe(
        response => {
          console.log('Image uploaded successfully!', response);
          this.uploadedImage = response.image_path;


          this.updateTaskStatus();
        },
        error => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  private updateTaskStatus(): void {
    if (this.userTask) {
      this.userTask.status = this.taskStatus;
      this.taskService.updateAssignTaskStatus(this.userTask, this.id).subscribe(
        () => {
          console.log('Task status updated successfully!');
          this.router.navigate(['/adviser-view']);
        },
        error => {
          console.error('Error updating task status:', error);
        }
      );
    }
  }




}

