import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  @Input() title: string = 'Kainatın Sırlarına Yolculuk';
  @Input() description: string = 'Uzaydan gelen ışık yıllarına dalın ve bilinmeyeni keşfedin.';
  @Input() buttonText: string = 'Keşfet';
  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
