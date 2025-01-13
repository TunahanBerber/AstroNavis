import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ThemeService } from '../../../data/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports:[CommonModule]
})
export class HeroSectionComponent implements OnInit {
  constructor(private themeService: ThemeService) {}
  currentTheme: 'light' | 'dark' = 'dark';

  @Input() title: string = 'Kainatın Sırlarına Yolculuk';
  @Input() description: string = 'Uzaydan gelen ışık yıllarına dalın ve bilinmeyeni keşfedin.';
  @Input() buttonText: string = 'Keşfet';
  @Output() buttonClick = new EventEmitter<void>();

  ngOnInit() {
    this.themeService.loadTheme();
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.currentTheme);
  }
  
  

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
