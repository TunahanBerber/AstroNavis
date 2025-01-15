import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NasaService {
  private baseUrl = 'https://astro-navis-backend.vercel.app/api/v1/apod';
  private localBaseUrl = 'http://localhost:3002/api/v1/apod';

  constructor(private http: HttpClient) {}

  // Google Translate üzerinden çeviri işlemi
  private translateText(text: string): Observable<string> {
    const parts = text.match(/[^.!?]+[.!?]+/g) || [text];

    return forkJoin(
      parts.map((part) =>
        this.http
          .get<any>(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=tr&dt=t&q=${encodeURIComponent(
              part
            )}`
          )
          .pipe(
            map((response) => this.normalizeText(response[0][0][0])), 
            catchError(() => of(part))
          )
      )
    ).pipe(
      map((translatedParts) => translatedParts.join(' ')), 
      catchError(() => of(text)) 
    );
  }

  // Çevrilen metni normalize et
  private normalizeText(text: string): string {
    return text
      .replace(/\s+/g, ' ') 
      .replace(/(?<=[a-zıüğçşö])(?=[A-ZİÜĞÇŞÖ])/g, ' ');
  }


  getPhotoByDate(date: string): Observable<any> {
    const url = `${this.baseUrl}?date=${date}`; 
    return this.http.get<any>(url).pipe(
      switchMap((data) => {
        console.log('Orijinal Başlık:', data.title);
        console.log('Orijinal Explanation:', data.explanation);
  
        const title$ = this.translateText(data.title); 
        const explanation$ = this.translateText(data.explanation); 
  
        return forkJoin({ title: title$, explanation: explanation$ }).pipe(
          map((translations) => ({
            ...data,
            title: translations.title,
            explanation: translations.explanation,
          }))
        );
      }),
      catchError((error) => {
        console.error('Backend API Hatası:', error);
        return of({ error: 'Veri alınamadı.' });
      })
    );
  }
  
}
