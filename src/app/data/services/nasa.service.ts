import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, switchMap, catchError, of } from 'rxjs';
import { TranslationService } from '../language/translation.service';

@Injectable({
  providedIn: 'root',
})
export class NasaService {
  // NASA APOD API'sine erişim sağlamak için URL'imiz
  private baseUrl = 'https://astronavis-backend.vercel.app/api/v1/apod';
  // private baseUrl = 'https://astronavis-backend.vercel.app/api/v1/apod';


  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {}

  // Belirli bir tarihe göre NASA'nın fotoğrafını çekip, başlık ve açıklamayı çeviriyorum.
  getPhotoByDate(date: string): Observable<any> {
    const url = `${this.baseUrl}?date=${date}`;

    return this.http.get<any>(url).pipe(
      switchMap((data) => {
        console.log('Orijinal Başlık:', data.title);
        console.log('Orijinal Açıklama:', data.explanation);

        // Başlık ve açıklama metinlerini çeviri servisine gönderiyorum.
        const translatedTitle$ = this.translationService.translateText(data.title);
        const translatedExplanation$ = this.translationService.translateText(data.explanation);

        // Her iki çeviri tamamlandığında, sonuçları birleştirip, orijinal veriye ekliyorum.
        return combineLatest([translatedTitle$, translatedExplanation$]).pipe(
          map(([translatedTitle, translatedExplanation]) => ({
            ...data,
            title: translatedTitle,
            explanation: translatedExplanation,
          }))
        );
      }),
      catchError((error) => {
        console.error('NASA API hatası:', error);
        return of({ error: 'Veri alınamadı.' });
      })
    );
  }
}
