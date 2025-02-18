import { Component, OnInit } from '@angular/core';
import { MarsRoverService } from '../../data/services/mars-rover.service';
import { CommonModule } from '@angular/common';
import { MarsRover } from '../../models/mars-rover';

@Component({
  selector: 'app-mars-rover',
  imports: [CommonModule],
  templateUrl: './mars-rover.component.html',
  styleUrls: ['./mars-rover.component.css'],
})
export class MarsRoverComponent implements OnInit {
  photosByDate: MarsRover[] = []; 
  currentIndex: number = 0; 
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private marsRoverService: MarsRoverService) {}

  ngOnInit(): void {
    this.fetchPhotos(); 
  }

 
  fetchPhotos(): void {
    this.isLoading = true; // Fotoğraflar yükleniyor
    this.errorMessage = '';
  
    // Yeni yöntemle subscribe kullanımı
    this.marsRoverService.getMarsPhotos().subscribe({
      next: (photos: MarsRover[]) => {
        if (photos.length > 0) {
          this.photosByDate = photos; 
        } else {
          this.errorMessage = 'Fotoğraf bulunamadı!'; 
        }
        this.isLoading = false; // Yükleme tamamlandı
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Hata oluştu:', error);
        this.errorMessage = 'Fotoğraflar alınamadı!'; 
      },
      complete: () => {
        console.log('Fotoğraflar başarıyla alındı');
      }
    });
  }
  

 
  prevPhoto(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--; 
    }
  }


  nextPhoto(): void {
    if (this.currentIndex < this.photosByDate.length - 1) {
      this.currentIndex++; 
    }
  }
}
