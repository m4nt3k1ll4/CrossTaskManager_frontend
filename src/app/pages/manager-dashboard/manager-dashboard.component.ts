import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardManagerResponse } from '../../models/dashboard-manager-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  providers: [DashboardService],
  imports: [CommonModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit {
  managerData?: DashboardManagerResponse;
  errorMessage = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadManagerData();
  }

  loadManagerData(): void {
    this.dashboardService.getManagerData().subscribe(
      (data) => {
        this.managerData = new DashboardManagerResponse(data);

      },
      (error) => {
        this.errorMessage = 'Failed to load Manager data. Please try again later.';
        console.error('Error fetching Manager data:', error);
      }
    );

  }
  get pendingUsersArray() {
    return this.managerData?.getPendingUsersArray() || [];
  }
}
