import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = 'https://astro-navis-backend.vercel.app/api/v1/generate';

  constructor(private http: HttpClient) { }

  generateResponse(prompt: string): Observable<{ generatedText: string }> {
    return this.http.post<{ generatedText: string }>(this.apiUrl, { prompt });
  }
}