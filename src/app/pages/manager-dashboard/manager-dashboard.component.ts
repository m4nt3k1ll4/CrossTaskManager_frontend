import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardManagerResponse } from '../../models/dashboard-manager-response.model';
import { CommonModule } from '@angular/common';
import { Chart,registerables } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';


Chart.register(...registerables);
Chart.register(ChartDataLabels);
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
        console.log(data);
        this.managerData = new DashboardManagerResponse(data);
        this.createPerformanceChart();

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

  createPerformanceChart(): void {
    console.log('Creating chart with data:', this.managerData);
    if (!this.managerData) return;

    const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Tareas Completadas', 'Tareas Pendientes'],
        datasets: [
          {
            label: 'Rendimiento de Tareas',
            data: [this.managerData.completed_tasks, this.managerData.pending_tasks],
            backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
          datalabels: {
            display: true, // Habilitar la visualización de las etiquetas
            formatter: (value: number, ctx: any) => {
              const total = ctx.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0);
              const percentage = ((value / total) * 100).toFixed(2) + '%'; // Calcular porcentaje
              return percentage;
            },
            color: 'white', // Color del texto
            font: {
              weight: 'bold', // Peso de la fuente
            },
          },
        },
      },
    });
  }
}
