import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { max } from 'rxjs';

@Component({
  selector: 'app-millers-planet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './millers-planet.component.html',
  styleUrls: ['./millers-planet.component.css']
})
export class MillersPlanetComponent implements OnInit {
  birthDate: string = '';
  maxDate: string = '';
  millerTime: { years: number, months: number, days: number, hours: number, minutes: number, seconds: number } | null = null;
  private readonly EARTH_YEARS_PER_MILLER_HOUR = 7;  // 7 Dünya yılı = 1 Miller saati
  private readonly EARTH_DAYS_PER_YEAR = 365.25;  // Dünya yılı gün cinsinden
  private readonly MILLER_HOURS_PER_DAY = 24; // Miller gezegeninde bir gün 24 saat


  ngOnInit(): void {
    this.setMaxDate(); 
  }
  setMaxDate(): void {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  calculateMillerTime(): void {
    if (!this.birthDate) return;

    const birth = new Date(this.birthDate);
    const now = new Date();

    // Dünya'da geçen toplam süreyi yıl olarak hesapla
    const diffInMilliseconds = now.getTime() - birth.getTime();
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * this.EARTH_DAYS_PER_YEAR);

    // Miller gezegeninde geçen süreyi saat olarak hesapla
    const millerHours = diffInYears / this.EARTH_YEARS_PER_MILLER_HOUR;

    // Saatleri Miller gezegeninde gün olarak çevir
    const totalMillerDays = millerHours / this.MILLER_HOURS_PER_DAY;

    // Yıllara, aylara ve günlere bölme
    const years = Math.floor(totalMillerDays / 365);
    const months = Math.floor((totalMillerDays % 365) / 30);
    const days = Math.floor((totalMillerDays % 365) % 30);

    // Saat hesaplaması
    const remainingFractionalDay = totalMillerDays - Math.floor(totalMillerDays);
    const totalHours = remainingFractionalDay * 24;
    const hours = Math.floor(totalHours);

    // Dakika hesaplaması
    const remainingFractionalHour = totalHours - hours;
    const totalMinutes = remainingFractionalHour * 60;
    const minutes = Math.floor(totalMinutes);

    // Saniye hesaplaması
    const remainingFractionalMinute = totalMinutes - minutes;
    const seconds = Math.floor(remainingFractionalMinute * 60);

    this.millerTime = { years, months, days, hours, minutes, seconds };
  }
}
