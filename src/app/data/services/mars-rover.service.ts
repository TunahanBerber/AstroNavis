import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MarsRover } from '../../models/mars-rover';


@Injectable({
  providedIn: 'root',
})
export class MarsRoverService {
  private readonly baseUrl = 'https://astronavis-backend.vercel.app/api/v1/mars-rover';

  constructor(private http: HttpClient) {}


  getMarsPhotos(): Observable<MarsRover[]> {
    return this.http.get<{ photos: MarsRover[] }>(this.baseUrl).pipe(
      map(response => response.photos || []), 
      catchError(error => {
        console.error('Mars Rover fotoğrafları alınırken hata oluştu:', error);
        return of([]); 
      })
    );
  }
}
