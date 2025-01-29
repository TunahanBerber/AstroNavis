import { Component } from '@angular/core';
import { NasaService } from '../../data/services/nasa.service';
import { tap, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nasa-gallery',
  templateUrl: './nasa-gallery.component.html',
  styleUrls: ['./nasa-gallery.component.css'],
  imports: [CommonModule],
})
export class NasaGalleryComponent {
  photo: any = null;
  isLoading = false;
  errorMessage: string | null = null;
  maxDate: string = '';
  minDate: string = '1995-06-16';
  headerTitle: string = 'Astronomi Günlük Görseli (APOD)';
  isDateSelected = false;
  selectedDateMessage: string | null = null;

  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.setMaxDate();
    this.isDateSelected = true;
    this.selectedDateMessage = `${this.maxDate} tarihinde APOD'da yayınlanan görsel:`;
    this.fetchPhoto(this.maxDate);
  }

  setMaxDate(): void {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  onDateChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;

    if (this.isValidDate(selectedDate)) {
      this.isDateSelected = true;
      this.selectedDateMessage = `${selectedDate} tarihinde APOD'da yayınlanan görsel:`;
      this.errorMessage = null;
      this.fetchPhoto(selectedDate);
    } else {
      this.isDateSelected = false;
      this.selectedDateMessage = null;
    }
  }

  isValidDate(selectedDate: string): boolean {
    const today = new Date();
    const selected = new Date(selectedDate);

    if (selected > today) {
      this.errorMessage = 'Bugünden sonraki bir tarih seçemezsiniz.';
      return false;
    }
    return true;
  }

  fetchPhoto(date: string): void {
    this.setLoadingState(true);

    this.nasaService
      .getPhotoByDate(date)
      .pipe(
        tap((data) => {
          this.photo = data;
          this.setLoadingState(false);
        }),
        catchError((error) => {
          this.errorMessage =
            error.status === 404
              ? 'Bu tarihe ait bir fotoğraf bulunamadı.'
              : 'Bir hata oluştu. Lütfen tekrar deneyin.';
          this.setLoadingState(false);
          return of(null);
        })
      )
      .subscribe();
  }

  setLoadingState(isLoading: boolean): void {
    this.isLoading = isLoading;
    if (isLoading) {
      this.errorMessage = null;
      this.photo = null;
      this.isDateSelected = false;
    }
  }
}
