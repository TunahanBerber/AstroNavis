import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../data/services/theme.service';

@Component({
  selector: 'app-theme-buttons',
  imports: [CommonModule],
  templateUrl: './theme-buttons.component.html',
  styleUrl: './theme-buttons.component.css'
})
export class ThemeButtonsComponent implements OnInit {
    constructor(private themeService: ThemeService) {}
    currentTheme: 'light' | 'dark' = 'dark';
  
    ngOnInit(): void {
      this.currentTheme = this.themeService.getTheme();
    }
    

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.currentTheme);
  }
  
}
