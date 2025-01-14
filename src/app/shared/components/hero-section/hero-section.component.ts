import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeButtonsComponent } from '../theme-buttons/theme-buttons.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports: [CommonModule,ThemeButtonsComponent,LogoComponent]
})
export class HeroSectionComponent  {

  @Input() title: string = 'Kainatın Sırlarına Yolculuk';
  @Input() description: string = 'Uzaydan gelen ışık yıllarına dalın ve bilinmeyeni keşfedin.';
  @Input() buttonText: string = 'Keşfet';
  @Output() buttonClick = new EventEmitter<void>();



  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
