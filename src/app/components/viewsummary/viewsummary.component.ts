import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewsummary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './viewsummary.component.html',
  styleUrl: './viewsummary.component.css'
})

export class ViewsummaryComponent implements OnInit{
  @ViewChild('summaryElement') summaryElement!: ElementRef;
  userMessage: string = '';
  
  constructor(){}

  ngOnInit(): void {
    
  }

  summarizeViews(): void {
    if (this.userMessage.trim() !== '') {
      this.addMessage(`User: ${this.userMessage}`, 'user-message');
      this.userMessage = '';

      // Placeholder logic for chatbot summary
      const summary = 'Chatbot: Summary of user views: Increased focus on small businesses and education reforms.';
      setTimeout(() => {
        this.addMessage(summary, 'chatbot-message');
      }, 1000); // Simulate response delay
    }
  }

  addMessage(message: string, messageType: string): void {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.className = `chat-message ${messageType}`;
    this.summaryElement.nativeElement.appendChild(messageElement);
    this.summaryElement.nativeElement.scrollTop = this.summaryElement.nativeElement.scrollHeight;
  }

}
