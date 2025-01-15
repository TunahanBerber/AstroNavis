import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'dark';

  constructor() {
    this.loadTheme();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }

  getTheme(): 'light' | 'dark' {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    return savedTheme || this.currentTheme;
  }

  loadTheme(): void {
    const savedTheme = this.getTheme();
    this.setTheme(savedTheme); // Varsayılan veya kaydedilmiş temayı uygula
  }
}
