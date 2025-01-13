import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); 
    } else {
      document.documentElement.classList.remove('dark'); 
    }

    localStorage.setItem('theme', theme); // Save
  }

  getTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const defaultTheme = savedTheme || 'dark';
    this.setTheme(defaultTheme);
  }
}
