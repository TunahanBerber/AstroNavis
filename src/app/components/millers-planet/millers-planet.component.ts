import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  descriptionText: string = '';
  millerTime: { years: number, months: number, days: number, hours: number, minutes: number, seconds: number } | null = null;

  private readonly EARTH_YEARS_PER_MILLER_HOUR = 7;
  private readonly EARTH_DAYS_PER_YEAR = 365.25;
  private readonly MILLER_HOURS_PER_DAY = 24;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.setMaxDate();
    this.loadDescriptionText();
  }

  setMaxDate(): void {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  loadDescriptionText(): void {
    this.http.get<{ millerDescription: string }>('assets/texts/millers-planet.json')
      .subscribe({
        next: (data) => {
          this.descriptionText = data.millerDescription;
        },
        error: (err: any) => {
          console.error('Açıklama metni yüklenirken hata oluştu:', err);
        }
      });
  }

  calculateMillerTime(): void {
    if (!this.birthDate) return;

    const birth = new Date(this.birthDate);
    const now = new Date();

    const diffInMilliseconds = now.getTime() - birth.getTime();
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * this.EARTH_DAYS_PER_YEAR);
    const millerHours = diffInYears / this.EARTH_YEARS_PER_MILLER_HOUR;
    const totalMillerDays = millerHours / this.MILLER_HOURS_PER_DAY;

    const years = Math.floor(totalMillerDays / 365);
    const months = Math.floor((totalMillerDays % 365) / 30);
    const days = Math.floor((totalMillerDays % 365) % 30);

    const remainingFractionalDay = totalMillerDays - Math.floor(totalMillerDays);
    const totalHours = remainingFractionalDay * 24;
    const hours = Math.floor(totalHours);

    const remainingFractionalHour = totalHours - hours;
    const totalMinutes = remainingFractionalHour * 60;
    const minutes = Math.floor(totalMinutes);

    const remainingFractionalMinute = totalMinutes - minutes;
    const seconds = Math.floor(remainingFractionalMinute * 60);

    this.millerTime = { years, months, days, hours, minutes, seconds };
  }
}
