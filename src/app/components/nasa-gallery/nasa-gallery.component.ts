import { Component } from '@angular/core';
import { NasaService } from '../../data/services/nasa.service';
import { tap, catchError, of, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nasa-gallery',
  templateUrl: './nasa-gallery.component.html',
  styleUrls: ['./nasa-gallery.component.css'],
  imports: [CommonModule],
})
export class NasaGalleryComponent {
  photo: any = null; // Fotoğraf bilgisi
  isLoading: boolean = false; // Yükleme durumu
  errorMessage: string | null = null; // Hata mesajı
  maxDate: string = ''; // Maksimum tarih
  minDate: string = '1995-06-16'; // Minimum tarih
  selectedDate: string = ''; // Kullanıcı tarafından seçilen tarih

  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.setMaxDate(); // Maksimum tarihi ayarla
  }

  setMaxDate(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // YYYY-MM-DD formatı
  }

  onDateChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    this.selectedDate = selectedDate;

    if (this.isValidDate(selectedDate)) {
      this.fetchPhoto(selectedDate); // Fotoğrafı getir
    }
  }

  isValidDate(selectedDate: string): boolean {
    if (!selectedDate) return false;

    const today = new Date();
    const selected = new Date(selectedDate);

    if (selected > today) {
      this.errorMessage = 'Lütfen bugünden sonraki bir tarih seçmeyin.';
      return false;
    }

    return true;
  }

  fetchPhoto(date: string): void {
    this.setLoadingState(true);

    this.nasaService.getPhotoByDate(date)
      .pipe(
        tap((data) => this.photo = data),
        catchError((error) => {
          console.error('API hatası:', error);
          if (error.status === 404) {
            this.errorMessage = 'Bu tarihe ait bir fotoğraf bulunamadı.';
          } else {
            this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
          }
          return of(null); // Hata durumunda boş veri döndür
        }),
        finalize(() => this.setLoadingState(false)) // Yükleme durumunu kapat
      )
      .subscribe();
  }

  setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    if (isLoading) {
      this.errorMessage = null;
      this.photo = null; // Yükleme sırasında önceki fotoğrafı temizle
    }
  }
}
