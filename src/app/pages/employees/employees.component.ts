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
  uniqueRoles: any[] = [];
  myForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder) {
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
        this.filterUniqueRoles();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      },
    });
  }

  filterUniqueRoles(): void {
    const uniqueRolesSet = new Set();
    this.uniqueRoles = this.employees.filter((employee) => {
      if (!uniqueRolesSet.has(employee.role!.name)) {
        uniqueRolesSet.add(employee.role!.name);
        return true;
      }
      return false;
    });
  }

  initEmployees(){
    this.showForm = true;
    this.initForm();
  }
  close(){
    this.showForm = false;
  }

  formSubmitEmployee(form:FormGroup): void{
    console.log(form);
    const employee: User = {
      'name':form.value.name,
      'email':form.value.email,
      'password':form.value.password,
      'role_id':form.value.role_id,
    };

    if(form.value.id) {
      this.usersService.updateEmployees( employee ,form.value.id ).subscribe(data => {
        this.getEmployees();
        console.log(data);
        this.close();
      });
    } else{
      this.usersService.addEmployees(employee).subscribe(data => {
        this.getEmployees()
        console.log(data)
        this.close();
      });
    }
  }

  updateEmployees(user : User){
    this.initForm(user.id,user.name,user.email,user.password,user.role_id);
    this.showForm = true;
  }
  deleteEmployees(id: number = 0):void{
    this.usersService.deleteEmployees(id).subscribe(data => {
      this.getEmployees()
      console.log(data)
    });
  }


}
