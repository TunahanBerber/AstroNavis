import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NasaService {
  private apiKey = 'thgdYatyAMdbxaT8WOFj8CFeE2I7Bjz3Rbq4jfqg';
  private baseUrl = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) {}

  // Çeviri için Google Translate Web API
  private translateText(text: string): Observable<string> {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=${encodeURIComponent(
      text
    )}`;
    return this.http.get<any>(url).pipe(map((response) => response[0][0][0]));
  }

  // Günlük Fotoğrafı Al ve Çevir
  getDailyPhoto(): Observable<any> {
    const url = `${this.baseUrl}?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      switchMap((data) => {
        const title$ = this.translateText(data.title); // Başlık çevirisi
        const explanation$ = this.translateText(data.explanation); // Açıklama çevirisi

        // Çevirileri paralel çalıştır
        return forkJoin({ title: title$, explanation: explanation$ }).pipe(
          map((translations) => ({
            ...data,
            title: translations.title,
            explanation: translations.explanation,
          }))
        );
      })
    );
  }

  // Tarihe Göre Fotoğraf Al ve Çevir
  getPhotoByDate(date: string): Observable<any> {
    const url = `${this.baseUrl}?api_key=${this.apiKey}&date=${date}`;
    return this.http.get<any>(url).pipe(
      switchMap((data) => {
        const title$ = this.translateText(data.title); // Başlık çevirisi
        const explanation$ = this.translateText(data.explanation); // Açıklama çevirisi

        // Çevirileri paralel çalıştır
        return forkJoin({ title: title$, explanation: explanation$ }).pipe(
          map((translations) => ({
            ...data,
            title: translations.title,
            explanation: translations.explanation,
          }))
        );
      })
    );
  }
}
