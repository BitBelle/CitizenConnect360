import { Component } from '@angular/core';
import { Incident } from '../../models/incidents';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reported-incidents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reported-incidents.component.html',
  styleUrl: './reported-incidents.component.css'
})
export class ReportedIncidentsComponent {
  
  incidents: Incident[] = [
    {
      userName: 'John Doe',
      time: '9:30am',
      description: 'Saw some suspicious activity near the park.',
      image: 'https://cdn.pixabay.com/photo/2017/08/06/11/44/people-2591692_1280.jpg'
    },
    {
      userName: 'Jane Smith',
      time: '10:00am',
      description: 'Ongoing protest at Main road',
      image: 'https://cdn.pixabay.com/photo/2020/06/02/15/11/black-lives-matter-5251408_1280.jpg'
    },
  ];

  filteredIncidents: Incident[] = this.incidents

  constructor() { }

  ngOnInit(): void {
    this.createCategoryChart();
    this.createTrendChart();
  }

  filterIncidents(event: any): void {
    const selectedUserName = event.target.value;
    if (selectedUserName === 'all') {
      this.filteredIncidents = this.incidents; // Reset to all incidents
    } else {
      this.filteredIncidents = this.incidents.filter(incident => incident.userName === selectedUserName); // Filter based on selected user name
    }
  }

  markAsPriority(incident: any): void {
    // marked-incident as priority
    console.log('Marked as priority:', incident);
  }

  createCategoryChart(): void {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Theft', 'Vandalism', 'Accidents'],
        datasets: [{
          data: [12, 19, 7],
          backgroundColor: ['#9FE2BF', '#d3d8c8', '#FF7F7F']
        }]
      }
    });
  }

  createTrendChart(): void {
    const ctx = document.getElementById('trendChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Incidents',
          data: [3, 7, 4, 5, 8, 6],
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true
        }]
      }
    });
  }
  
}
