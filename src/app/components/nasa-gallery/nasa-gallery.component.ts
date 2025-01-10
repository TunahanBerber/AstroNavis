import { Component } from '@angular/core';
import { NasaService } from '../../data/services/nasa.service';
import { tap, catchError, of, finalize } from 'rxjs';

@Component({
  selector: 'app-nasa-gallery',
  imports: [],
  templateUrl: './nasa-gallery.component.html',
  styleUrl: './nasa-gallery.component.css'
})
export class NasaGalleryComponent {
  photo: any = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  maxDate: string = '';

  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.setMaxDate();
  }

  setMaxDate(): void {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // YYYY-MM-DD formatı
  }

  onDateChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    if (!this.isValidDate(selectedDate)) return;

    this.fetchPhoto(selectedDate);
  }

  isValidDate(selectedDate: string): boolean {
    if (!selectedDate) return false;

    const today = new Date();
    const selected = new Date(selectedDate);

    if (selected > today) {
      alert('Lütfen bugünden sonraki bir tarih seçmeyin.');
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
          this.errorMessage = 'Fotoğraf yüklenirken bir hata oluştu. Lütfen tekrar deneyin.';
          return of(null); // Hata durumunda boş bir observable döndür
        }),
        finalize(() => this.setLoadingState(false))
      )
      .subscribe();
  }

  setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    if (isLoading) this.errorMessage = null; // Yükleme sırasında hatayı temizle
  }
}
