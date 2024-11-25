import { AuthService } from './../../services/auth.service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core' ;
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.navigate(['/login']);
  }

  const role = authService.getRoleFromScopes();
  const allowedRoles = route.data?.['roles'] as Array<string>;

  if (allowedRoles && !allowedRoles.includes(role)) {
    const redirectPath = role === 'ceo' ? '/dashboard' : role === 'manager' ? '/manager-dashboard' : '/adviser-view';
    return router.navigate([redirectPath]);
  }

  return true;
};
