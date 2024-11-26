import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { DashboardManagerResponse } from '../../models/dashboard-manager-response.model';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  providers: [
    DashboardService,
    AuthService
  ],
  imports: [],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit {
  managerData?: DashboardManagerResponse;
  loading = true;
  errorMessage = '';

  constructor(private dashboardService: DashboardService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadManagerData();
  }

  loadManagerData(): void {
    this.dashboardService.getManagerData().subscribe(
      (data) => {
        this.managerData = data;
        this.loading = false;

      },
      (error) => {
        this.errorMessage = 'Failed to load Manager data. Please try again later.';
        this.loading = false;
        console.error('Error fetching Manager data:', error);
      }
    );
  }
}
