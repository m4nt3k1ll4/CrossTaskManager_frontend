import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',

})
export class EmployeesComponent {
  constructor() {}

}
