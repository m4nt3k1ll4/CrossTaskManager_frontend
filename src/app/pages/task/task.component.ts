import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  router = inject(Router)

  ngOnInit() {

  }

  getProjects() {
 //function
  }
  onEdit() {

  }
  onDelete() {

  }
}
