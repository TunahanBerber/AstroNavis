import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AIService {
  constructor(private http: HttpClient) { }

  generateResponse(prompt: string): Observable<{ generatedText: string }> {
    return this.http.post<{ generatedText: string }>(
      environment.apiUrl, // Environment'dan URL'yi al
      { prompt }
    );
  }
}