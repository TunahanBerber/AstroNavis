import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../data/services/ai.service';
import { Message } from '../../models/message';

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

  constructor(private aiService: AiService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage = new Message(this.userInput, 'user');
    this.messages.push(userMessage);
    this.loading = true;

    // Backend API'ye post isteği göndermek için AiService kullanıyoruz
    this.aiService.generateResponse(this.userInput).subscribe(
      (res: { generatedText: string }) => {
        // API yanıtı başarılıysa
        if (res.generatedText) {
          const botMessage = new Message(res.generatedText, 'bot');
          this.messages.push(botMessage);
        } else {
          // Hata durumunda
          const botMessage = new Message('Bir hata oluştu. Lütfen tekrar deneyin.', 'bot');
          this.messages.push(botMessage);
        }
        this.loading = false;
      },
      (error) => {
        // API isteği başarısız olursa hata mesajını göster
        console.error('API Hatası:', error);
        const botMessage = new Message('Bir hata oluştu. Lütfen tekrar deneyin.', 'bot');
        this.messages.push(botMessage);
        this.loading = false;
      }
    );

    // Kullanıcı girişi sıfırla
    this.userInput = '';
  }
}
