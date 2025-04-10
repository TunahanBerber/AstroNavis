import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
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
export class ChatbotComponent implements AfterViewChecked {
  messages: Message[] = [
    new Message(
      `👋 Merhaba! Ben Astronavis'in yapay zekâ asistanıyım.  
🚀 Uzayla ilgili merak ettiğiniz her şeyi cevaplayabilirim:  
yıldızlar, gezegenler, kara delikler, süpernovalar ve çok daha fazlası...  

Hazırsanız yıldızlara birlikte bakalım! ✨`,
      'bot',
      new Date()
    ),
  ];

  userInput: string = '';
  loading: boolean = false;
  @ViewChild('autoTextarea') autoTextarea!: ElementRef;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private aiService: AiService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage = new Message(this.userInput, 'user');
    this.messages.push(userMessage);
    this.loading = true;

    // Backend API'ye post isteği gönder
    this.aiService.generateResponse(this.userInput).subscribe(
      (res: { generatedText: string }) => {
        const botMessage = new Message(
          res.generatedText || 'Bir hata oluştu. Lütfen tekrar deneyin.',
          'bot'
        );
        this.messages.push(botMessage);
        this.loading = false;
      },
      (error) => {
        console.error('API Hatası:', error);
        const botMessage = new Message(
          'Bir hata oluştu. Lütfen tekrar deneyin.',
          'bot'
        );
        this.messages.push(botMessage);
        this.loading = false;
      }
    );

    // Giriş sıfırlama ve textarea boyutu resetleme
    this.userInput = '';
    setTimeout(() => {
      this.adjustTextareaHeight();
      this.scrollToBottom(); // Mesaj gönderildikten sonra en alta kaydır
    }, 0);
  }

  adjustTextareaHeight() {
    const textarea = this.autoTextarea.nativeElement as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  // Scroll işlemini gerçekleştiren fonksiyon
  scrollToBottom() {
    const messagesContainer = this.messagesContainer.nativeElement;
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Burada container'ın scrollTop'unu en alta ayarlıyoruz
  }

  ngAfterViewChecked() {
    // Her render sonrası en alt kaydırma kontrolü
    this.scrollToBottom();
  }
}
