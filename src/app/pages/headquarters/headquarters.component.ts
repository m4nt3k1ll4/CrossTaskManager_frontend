import { Headquarter } from './../../models/headquarter.model';
import { User } from '../../models/user.model';
import { Component } from '@angular/core';
import { HeadquarterService } from '../../services/headquarter.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-headquarters',
  standalone: true,
  providers: [HeadquarterService],
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  templateUrl: './headquarters.component.html',
  styleUrl: './headquarters.component.css'
})

export class HeadquartersComponent {
  showForm: boolean = false;
  headquarter: Headquarter[] = [];
  myForm!: FormGroup;
  loading: boolean = false;
  uniqueManagers: any[] = [];
  manager_id: any;



  constructor(
    private headquarterService: HeadquarterService,
    private formBuilder: FormBuilder,
  ) {
    this.initForm();

  }

  ngOnInit(): void {
    this.getHeadquarter();
  }


  initForm(
    id?: number,
    name?: string,
    manager_id?: string,
    manager?: User
  ) {
    this.myForm = this.formBuilder.group({
      id: [id],
      name: [name],
      manager_id: [manager_id],
      manager: [manager]
    });
  }


  getHeadquarter() {
    this.loading = true;
    this.headquarterService.getHeadquarters().subscribe({
      next: (response) => {
        //console.log('Headquarters received:', response);  // Agrega esta línea para verificar los datos
        this.headquarter = response;
        this.populateUniqueManagers();  // Asegúrate de llenar los managers después de recibir los datos
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }


  populateUniqueManagers(): void {
    const uniqueManagersSet = new Set();
    this.uniqueManagers = this.headquarter
      .map((headquarter) => {
        //console.log('Headquarter Manager:', headquarter.manager); // Verificar cada "manager"
        return headquarter.manager;
      })
      .filter((manager) => {
        if (manager && !uniqueManagersSet.has(manager.id)) {
          uniqueManagersSet.add(manager.id);
          return true;
        }
        return false;
      });

    //console.log('Unique Managers:', this.uniqueManagers);  // Verifica los datos de uniqueManagers
  }


  getManagerName(managerId: string): string {
    const manager = this.uniqueManagers.find((manager) => manager.id === parseInt(managerId, 10));
    return manager ? manager.name : 'Sin líder';
  }




  initHeadquarter() {
    this.showForm = true;
    this.initForm();
  }

  close() {
    this.showForm = false;
  }

  formSubmitHeadquarter(form: FormGroup) {
    const headquarter: Headquarter = {
      'id': form.value.id,
      'name': form.value.name,
      'manager_id': form.value.manager_id,
    };

    if (form.value.id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this Headquarter?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.headquarterService.updateHeadquarters(headquarter, form.value.id).subscribe(
            (data) => {
              this.getHeadquarter();
              //console.log(data);
              this.close();
            },
            (error) => {
              console.error('Error Updating Headquarter', error);
            }
          )
        }
      });
    } else {
      this.headquarterService.addHeadquarters(headquarter).subscribe(
        (data) => {
          this.getHeadquarter();
          //console.log(data);
          this.close();
        },
        (error) => {
          console.error('Error adding Headquarter:', error);
        }
      );
    }
  }

  updateHeadquarter(headquarter: Headquarter) {
    this.initForm(headquarter.id, headquarter.name, headquarter.manager_id, );
    this.showForm = true;
  }

  deleteHeadquarter(id: number = 0): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Headquarter?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.headquarterService.deleteHeadquarters(id).subscribe(
          (data) => {
            this.getHeadquarter();
            //console.log(data);
          },
          (error) => {
            console.error('Error deleting Headquarter', error);
          }
        )
      }
    })
  }
}
