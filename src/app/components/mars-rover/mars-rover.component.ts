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
  private shuffleArray(array: MarsRover[]): MarsRover[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

 
  fetchPhotos(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    this.marsRoverService.getMarsPhotos().subscribe({
      next: (photos: MarsRover[]) => {
        if (photos.length > 0) {
          this.photosByDate = this.shuffleArray(photos); 
        } else {
          this.errorMessage = 'Fotoğraf bulunamadı!';
        }
        this.isLoading = false;
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
