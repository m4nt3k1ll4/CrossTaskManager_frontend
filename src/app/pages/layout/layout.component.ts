import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  providers: [AuthService],
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
constructor(public authService: AuthService,private router: Router){}

showLink(scopeToEvaluate : string){
 return this.authService.hasScope(scopeToEvaluate)
}
}
