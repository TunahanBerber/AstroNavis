import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = 'https://astronavis-backends.vercel.app/api/v1/ai/generate';


  constructor(private http: HttpClient) {}

  generateResponse(prompt: string) {
    return this.http.post<{ generatedText: string }>(this.apiUrl, { prompt });
  }
}
