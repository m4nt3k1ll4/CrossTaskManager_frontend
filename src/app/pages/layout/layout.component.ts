import { Component } from '@angular/core';
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
  constructor(public authService: AuthService, private router: Router) { }

  showRole(roleToEvaluate: string): boolean {
    const currentRole = this.authService.getRoleFromScopes();
    const rolesToEvaluate = roleToEvaluate.split(',').map(role => role.trim());
    switch (currentRole) {
      case 'ceo':
        return rolesToEvaluate.includes('ceo');
      case 'manager':
        return rolesToEvaluate.includes('manager');
      case 'adviser':
        return rolesToEvaluate.includes('adviser');
      default:
        return false;
    }
  }




  redirectToHome(): void {
    const role = this.authService.getRoleFromScopes();

    switch (role) {
      case 'ceo':
        this.router.navigate(['/dashboard']);
        break;
      case 'manager':
        this.router.navigate(['manager-dashboard']);
        break;
      case 'adviser':
        this.router.navigate(['/adviser-view']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}

