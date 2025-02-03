import { Component, OnInit } from '@angular/core';
import { MarsRoverService } from '../../data/services/mars-rover.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mars-rover',
  imports: [CommonModule],
  templateUrl: './mars-rover.component.html',
  styleUrls: ['./mars-rover.component.css'],
})
export class MarsRoverComponent implements OnInit {
  photosByDate: any[] = []; // Fotoğrafları buraya tutacağım
  currentIndex: number = 0; // Hangi fotoğrafı gösterdiğimi takip ediyorum
  isLoading: boolean = false; // Yükleniyor durumunu burada kontrol ediyorum
  errorMessage: string = ''; // Hata mesajını burada tutuyorum

  constructor(private marsRoverService: MarsRoverService) {}

  ngOnInit(): void {
    this.fetchPhotos(); // Fotoğrafları ilk başta çekiyorum
  }

  // Fotoğrafları çeken fonksiyonum burada
  fetchPhotos(): void {
    this.isLoading = true; // Fotoğraflar yükleniyor, göstereceğim
    this.errorMessage = ''; // Her şey düzgün olduğundan emin olmak için hata mesajını sıfırlıyorum

    this.marsRoverService.getMarsPhotos().subscribe(
      (data) => {
        // Eğer fotoğraf verisi geldiyse, array'i güncelliyorum
        if (data && data.length > 0) {
          this.photosByDate = data;
        } else {
          // Fotoğraf yoksa, kullanıcıya bilgi veriyorum
          this.errorMessage = 'Fotoğraf bulunamadı!';
        }
        this.isLoading = false; // Yüklenme tamamlandı
      },
      (error) => {
        // Eğer bir hata olursa, hata mesajı veriyorum
        console.error('Hata oluştu:', error);
        this.isLoading = false;
        this.errorMessage = 'Fotoğraflar alınamadı!'; // Kullanıcıya hata mesajı
      }
    );
  }

  // Önceki fotoğrafa gitmek için fonksiyon
  prevPhoto(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--; // Eğer ilk fotoğraf değilse, bir önceki fotoğrafa gidiyorum
    }
  }

  // Sonraki fotoğrafa gitmek için fonksiyon
  nextPhoto(): void {
    if (this.currentIndex < this.photosByDate.length - 1) {
      this.currentIndex++; // Eğer son fotoğraf değilse, bir sonraki fotoğrafa geçiyorum
    }
  }
}
