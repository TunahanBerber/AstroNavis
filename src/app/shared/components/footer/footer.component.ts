import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule,LogoComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  onSubscribe(): void {
    if (!this.email) {
      this.message = 'Lütfen geçerli bir e-posta giriniz!';
      return;
    }

    this.subscribeEmail(this.email).subscribe({
      next: () => {
        this.message = 'E-posta başarıyla abone oldu!';
        this.email = '';
      },
      error: (error) => {
        if (error.status === 400) {
          this.message = 'Bu e-posta adresi zaten kayıtlı!';
        } else {
          this.message = 'Abone olurken bir hata oluştu.';
        }
        console.error('Error:', error);
      }
    });
  }

  subscribeEmail(email: string): Observable<any> {
    return this.http.post('http://localhost:3002/api/v1/email', { email }).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        return of(error);
      })
    );
  }
}
