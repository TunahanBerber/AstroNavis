import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ThemeService } from '../../data/services/theme.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  @Input() title: string = 'Kainatın Sırlarına Yolculuk';
  @Input() description: string = 'Uzaydan gelen ışık yıllarına dalın ve bilinmeyeni keşfedin.';
  @Input() buttonText: string = 'Keşfet';
  @Output() buttonClick = new EventEmitter<void>();

  ngOnInit() {
    this.themeService.loadTheme();
  }

  toggleTheme(): void {
    const currentTheme = this.themeService.getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
