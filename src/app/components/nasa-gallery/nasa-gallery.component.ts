import { Component, Input, OnChanges } from '@angular/core';
import { tap, catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NasaGallery } from '../../models/nasa-gallery';
import { NasaService } from '../../data/services/nasa.service';

@Component({
  selector: 'app-nasa-gallery', 
  templateUrl: './nasa-gallery.component.html',
  styleUrls: ['./nasa-gallery.component.css'],
  imports: [CommonModule],
})
export class NasaGalleryComponent implements OnChanges {
  // NASA'dan gelen veri modeli: NasaGallery
  @Input() nasaData!: NasaGallery; 
  safeVideoUrl!: SafeResourceUrl; // Video URL'leri için güvenli URL
  photo: NasaGallery | null = null; 
  isLoading = false; // 
  errorMessage: string | null = null;
  maxDate: string = '';
  minDate: string = '1995-06-16';
  headerTitle: string = 'Astronomi Günlük Görseli (APOD)';
  isDateSelected = false;
  selectedDateMessage: string | null = null;

  constructor(
    private nasaService: NasaService,
    private sanitizer: DomSanitizer // URL güvenliği için DomSanitizer
  ) {}

  ngOnInit(): void {
    this.setMaxDate(); 
    this.isDateSelected = true; 
    this.selectedDateMessage = `${this.maxDate} tarihinde APOD'da yayınlanan görsel:`; 
    this.fetchPhoto(this.maxDate);
  }

  ngOnChanges(): void {
    // Eğer gelen veri bir video ise, güvenli URL'yi oluşturuyoruz
    if (this.nasaData && this.isVideo()) {
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.nasaData.url);
    }
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
        tap((data: NasaGallery) => { 
          this.photo = data; 
          if (this.photo.media_type === 'video') {
            this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.photo.url);
          }
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

  isVideo(): boolean {
    return this.nasaData?.media_type === 'video';
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
