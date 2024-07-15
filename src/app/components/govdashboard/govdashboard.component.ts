import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-govdashboard',
  standalone: true,
  imports: [],
  templateUrl: './govdashboard.component.html',
  styleUrl: './govdashboard.component.css'
})
export class GovdashboardComponent {

  constructor(private router:Router) {
    // Register the components we want to use
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.renderViewsChart();
    this.renderIncidentsChart();
  }

  navigateToUserViews(): void {
    this.router.navigate(['/viewsummary']);
  }

  renderViewsChart(): void {
    const ctx = document.getElementById('viewsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Views',
          data: [65, 59, 80, 81, 56, 55],
          borderColor: '#0b5004',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true
          },
          y: {
            display: true
          }
        }
      }
    });
  }

  renderIncidentsChart(): void {
    const ctx = document.getElementById('incidentsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Theft', 'Assault', 'Vandalism', 'Fraud', 'Robbery'],
        datasets: [{
          label: 'Incidents',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgb(168, 177, 180)',
          borderColor: 'rgb(168, 177, 185)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true
          },
          y: {
            display: true
          }
        }
      }
    });
  }
}

