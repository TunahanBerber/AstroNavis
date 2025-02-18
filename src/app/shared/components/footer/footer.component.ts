import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';
import { EmailService } from '../../../data/services/email.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';
  message: string = '';

  constructor(private emailService: EmailService) {} 

  onSubscribe(): void {
    if (!this.email) {
      this.message = 'Lütfen geçerli bir e-posta giriniz!';
      return;
    }

    // EmailService ile abonelik işlemi başlatılıyor
    this.emailService.subscribeEmail(this.email).subscribe({
      next: () => {
        this.message = 'E-posta başarıyla abone oldu!';
        this.email = '';
      },
      error: (error) => {
        if (error.status === 409) {
          this.message = 'Bu e-posta adresi zaten kayıtlı!';
        } else {
          this.message = 'Abone olurken bir hata oluştu.';
        }
        console.error('Error:', error);
      }
    });
  }
}
