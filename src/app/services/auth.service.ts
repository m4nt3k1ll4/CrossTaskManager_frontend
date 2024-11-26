import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient)
  private apiUrl = 'http://127.0.0.1:8000/api';
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, { email, password });
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }

  getRoleFromScopes(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeJwt(token);
      const scopes = decodedToken.scopes;
      //console.log(decodedToken, scopes);
      if (scopes.includes('manage-users') && scopes.includes('manage-tasks') && scopes.includes('view-tasks')) {
        return 'ceo';
      } else if (scopes.includes('manage-tasks') && scopes.includes('view-tasks')) {
        return 'manager';
      } else if (scopes.includes('view-tasks')) {
        return 'adviser';
      }
    }
    return '';
  }


  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  decodeJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
  getScopes() {
    const token = this.getToken();
    if (token != null) {
      const decodedToken = this.decodeJwt(token);
      return decodedToken.scopes;
    }
  }
  hasScope(scope: string): boolean {
    const scopes = this.getScopes();
    return scopes.includes(scope);
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
