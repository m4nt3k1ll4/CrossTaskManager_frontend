import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { DashboardCEOResponse } from '../../models/dashboard-ceoresponse.model';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


Chart.register(...registerables);
Chart.register(ChartDataLabels);
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
  colors = ["red", "green", "yellow"];

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
        this.createGlobalTaskComparisonChart();
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
    return colors[index % colors.length];
  }


  createGlobalTaskComparisonChart(): void {
    if (!this.ceoData) return;


    const headquarterNames = this.ceoData.headquarters.map(h => h.headquarterName);
    const completedTasks = this.ceoData.headquarters.map(h => h.completedTasks);
    const pendingTasks = this.ceoData.headquarters.map(h => h.pendingTasks);

    const ctx = document.getElementById('globalTaskComparisonChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: headquarterNames,
        datasets: [
          {
            label: 'Completed Tasks',
            data: completedTasks,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Pending Tasks',
            data: pendingTasks,
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw} tasks`;
              }
            }
          }
        }
      }
    });
  }
}



