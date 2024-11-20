import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  router = inject(Router)

  constructor() {
    //place for consrtuctor
  }

  initializeForm() {
    //place for function
  }

  getPRoject() {

  }


  onSaveProject() {

  }

  onUpdate() {

  }

}
