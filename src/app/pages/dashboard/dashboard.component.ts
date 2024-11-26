import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { DashboardCEOResponse } from '../../models/dashboard-ceoresponse.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [
    DashboardService,
    AuthService
  ],
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ceoData?: DashboardCEOResponse;
  loading = true;
  errorMessage = '';
  headquarter: any;
  colors = ["red", "green", "yellow"]

  constructor(private dashboardService: DashboardService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCEOData();
  }

  loadCEOData(): void {
    this.dashboardService.getCEOData().subscribe(
      (data) => {
        console.log(data);
        this.ceoData = data;
        this.loading = false;
        console.log(this.ceoData.headquarters)
      },
      (error) => {
        this.errorMessage = 'Failed to load CEO data. Please try again later.';
        this.loading = false;
        console.error('Error fetching CEO data:', error);
      }
    );
  }

  getColor(index: number): string {
    const colors = ['bg-primary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-info'];
    return colors[index % colors.length]; // Cicla entre los colores
  }


}
