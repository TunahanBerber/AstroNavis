import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  messages: Message[] = [];
  userInput: string = '';
  loading: boolean = false;
  private apiUrl = 'http://localhost:3002/api/v1/ai/generate'; // Backend API URL

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage: Message = { text: this.userInput, sender: 'user' };
    this.messages.push(userMessage);
    this.loading = true;

    // Backend API'ye post isteği gönder
    this.http
      .post<{ generatedText: string }>(this.apiUrl, { prompt: this.userInput })
      .subscribe(
        (res) => {
          // API yanıtı başarılıysa
          if (res.generatedText) {
            this.messages.push({ text: res.generatedText, sender: 'bot' });
          } else {
            // Hata durumunda
            this.messages.push({
              text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
              sender: 'bot',
            });
          }
          this.loading = false;
        },
        (error) => {
          // API isteği başarısız olursa hata mesajını göster
          console.error('API Hatası:', error);
          this.messages.push({
            text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
            sender: 'bot',
          });
          this.loading = false;
        }
      );

    // Kullanıcı girişi sıfırla
    this.userInput = '';
  }
}
