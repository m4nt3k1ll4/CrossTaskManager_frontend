import { Role, User } from '../../models/user.model';
import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-employees',
  standalone: true,
  providers: [UsersService],
  imports: [
    NgFor,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',

})
export class EmployeesComponent {
  showForm: boolean = false;
  employees: User[] = [];
  myForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
   }

   ngOnInit(): void {
    this.getEmployees();
  }


  initForm(
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    role_id?: string,
    role?: Role
  ) {
    this.myForm = this.formBuilder.group({
      id: [id ],
      name: [name],
      email: [email],
      password: [password],
      role_id: [role_id],
      role: [role],
    });
  }


  getEmployees() {
    this.loading = true;
    this.usersService.getEmployees().subscribe({
      next: (response) => {
        console.log(response);
        this.employees =response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  initEmployees(){
    this.showForm = true;
    this.initForm();
  }

}
