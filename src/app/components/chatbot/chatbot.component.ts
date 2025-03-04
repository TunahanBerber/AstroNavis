import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message';
import { AIService } from '../../data/services/ai.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: Message[] = [];
  userInput: string = '';
  loading: boolean = false;

  constructor(private aiService: AIService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage: Message = { 
      text: this.userInput, 
      sender: 'user',
      timestamp: new Date() 
    };
    
    this.messages.push(userMessage);
    this.loading = true;

    // AI servisini kullan
    this.aiService.generateResponse(this.userInput).subscribe({
      next: (res) => {
        const botMessage: Message = {
          text: res.generatedText || 'Bir hata oluştu. Lütfen tekrar deneyin.',
          sender: 'bot',
          timestamp: new Date()
        };
        this.messages.push(botMessage);
        this.loading = false;
      },
      error: (error) => {
        console.error('API Hatası:', error);
        this.messages.push({
          text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
          sender: 'bot',
          timestamp: new Date()
        });
        this.loading = false;
      }
    });

    this.userInput = '';
  }
}