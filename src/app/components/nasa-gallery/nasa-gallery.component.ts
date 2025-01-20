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
  photo: any = null; // API veya özel mesaj için fotoğraf verisi
  isLoading = false; // Yükleme durumunu takip eder
  errorMessage: string | null = null; // Hata mesajını tutar
  maxDate: string = ''; // Maksimum tarih
  minDate: string = '1995-06-16'; // Minimum tarih (NASA API sınırı)

  constructor(private nasaService: NasaService) {}

  ngOnInit(): void {
    this.setMaxDate();
  }

  setMaxDate(): void {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  onDateChange(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;

    // Özel tarih kontrolü: 2024-07-02
    if (selectedDate === '2024-07-02') {
      this.photo = {
        title: 'Canım Sevgilim Günaydınnn', // Başlık
        explanation: `Aşkımm, kütle çekimin sadece 43 kilo olabilir ama senin etrafında dönüp durmam için bu bile yeterli! Kuantum fiziği mi, yoksa senin gözlerin mi beni çekiyor bilmiyorum, ama çekim alanından kaçış hızına ulaşmak imkânsız. Sen benim kara delik kadar derin, yıldızlar kadar parlak ve bir kuasar kadar güçlü ışığım oldun. Evrenin neresinde olursam olayım, dönüp dolaşıp sana geliyorum. Çünkü benim tüm fizik kurallarım seninle yeniden yazılıyor!`, // Açıklama
        url: 'assets/img/myLady.jpeg', // Görsel yolu
      };
      this.errorMessage = null; // Hata mesajını sıfırla
      return; // API'ye istek yapılmaz
    }

    // Diğer tarihler için API isteği
    if (this.isValidDate(selectedDate)) {
      this.fetchPhoto(selectedDate);
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
          this.photo = data; // API'den gelen veriyi atar
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
    }
  }
}
