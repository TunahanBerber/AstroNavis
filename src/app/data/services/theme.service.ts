import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: 'light' | 'dark' = 'light';

  setTheme(theme: 'light' | 'dark') {
    this.currentTheme = theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); // 'dark' sınıfını ekle
    } else {
      document.documentElement.classList.remove('dark'); // 'dark' sınıfını kaldır
    }

    localStorage.setItem('theme', theme); // Temayı kaydet
  }

  getTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const defaultTheme = savedTheme || 'light'; // Varsayılan olarak light
    this.setTheme(defaultTheme);
  }
}
