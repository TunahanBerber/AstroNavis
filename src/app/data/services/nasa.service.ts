import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private apiKey = 'thgdYatyAMdbxaT8WOFj8CFeE2I7Bjz3Rbq4jfqg';
  private baseUrl = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) {}

  getDailyPhoto(): Observable<any> {
    const url = `${this.baseUrl}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  getPhotoByDate(date: string): Observable<any> {
    const url = `${this.baseUrl}?api_key=${this.apiKey}&date=${date}`;
    return this.http.get(url);
  }
}
