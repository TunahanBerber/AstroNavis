import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../data/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-buttons',
  templateUrl: './theme-buttons.component.html',
  styleUrls: ['./theme-buttons.component.css'],
  imports:[CommonModule]
})
export class ThemeButtonsComponent implements OnInit {
  currentTheme: 'light' | 'dark' = 'dark'; // Varsayılan olarak 'dark'

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getTheme(); -
    this.themeService.setTheme(this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.currentTheme); 
  }
}