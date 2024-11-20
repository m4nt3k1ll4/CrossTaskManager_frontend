import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-task-assign',
  standalone: true,
  imports: [],
  templateUrl: './task-assign.component.html',
  styleUrl: './task-assign.component.css'
})
export class TaskAssignComponent implements OnInit {

  router = inject(Router)

  constructor() {

  }

  ngOnInit(): void {

  }

  initializeForm() {

  }

  getAllData() {

  }
  onSave() {

  }
}
