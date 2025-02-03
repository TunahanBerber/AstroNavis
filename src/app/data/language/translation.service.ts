import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private http: HttpClient) {}

  /**
   * Metni kaynak dilden hedef dile çevirir.
   * @param text Çevrilecek metin.
   * @param sourceLang Kaynak dil (varsayılan 'en').
   * @param targetLang Hedef dil (varsayılan 'tr').
   * @returns Çevrilmiş metni içeren Observable<string>.
   */
  translateText(text: string, sourceLang: string = 'en', targetLang: string = 'tr'): Observable<string> {
    // Nokta, ünlem veya soru işareti ile biten cümleleri parçalara ayırıyoruz.
    const parts = text.match(/[^.!?]+[.!?]+/g) || [text];

    return forkJoin(
      parts.map((part) =>
        this.http
          .get<any>(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
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

  /**
   * Çeviri sonrası metni normalize eder.
   * @param text Normalize edilecek metin.
   * @returns Düzenlenmiş metin.
   */
  private normalizeText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }
}
