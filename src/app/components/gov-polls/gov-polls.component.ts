import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Poll } from '../../models/polls'; // Adjust path as per your actual file structure
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-gov-polls',
  standalone: true,
  imports:[CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gov-polls.component.html',
  styleUrls: ['./gov-polls.component.css']
})
export class GovPollsComponent implements OnInit {

  pollForm: FormGroup;
  polls: Poll[] = [];
  selectedPoll: Poll | null = null;
  dummyPolls!: Poll[];

  constructor(private fb: FormBuilder) {
    this.pollForm = this.fb.group({
      question: ['', Validators.required],
      options: this.fb.array([
        this.createOption() // Initialize with one answer option
      ]),
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initializing
    this.polls = this.dummyPolls;
  }

  createOption(): FormGroup {
    return this.fb.group({
      option: ['', Validators.required] // Form control for each option
    });
  }

  get options(): FormArray {
    return this.pollForm.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.createOption());
  }

  removeOption(index: number): void {
    this.options.removeAt(index);
  }

  createPoll(): void {
    if (this.pollForm.valid) {
      const newPoll: Poll = {
        question: this.pollForm.value.question,
        options: this.pollForm.value.options.map((option: { option: string }) => option.option), // Extract option values
        status: this.pollForm.value.status
      };
      this.polls.push(newPoll);
      this.pollForm.reset();
      this.pollForm.setControl('options', this.fb.array([this.createOption()])); // Reset options FormArray
      this.selectedPoll = null; // Clear selected poll
    } else {
      // Mark all fields as touched to display validation messages
      this.markFormGroupTouched(this.pollForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  editPoll(poll: Poll): void {
    // Implement edit functionality if needed
  }

  deletePoll(poll: Poll): void {
    const index = this.polls.indexOf(poll);
    if (index !== -1) {
      this.polls.splice(index, 1);
      if (this.selectedPoll === poll) {
        this.selectedPoll = null;
      }
    }
  }

  showPollResults(poll: Poll): void {
    this.selectedPoll = poll;
    this.renderPollResultsChart(poll); // Call method to render poll results chart
  }

  renderPollResultsChart(poll: Poll): void {
    // Dummy data for pie chart (example)
    const data = {
      labels: poll.options,
      datasets: [{
        data: [30, 20, 15, 35], // Example percentages for each option
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ]
      }]
    };

    // Render Chart.js pie chart
    const ctx = document.getElementById('pollResultsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        
      }
    });
  }

}
