import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
}

@Injectable({
  providedIn: 'root',
})
export class MarsRoverService {
  private baseUrl = 'https://astro-navis-backend.vercel.app/api/v1/mars-rover';

  constructor(private http: HttpClient) {}

  // Mars Rover fotoğraflarını çekiyorum.
  getMarsPhotos(): Observable<MarsPhoto[]> {
    return this.http.get<{ photos: MarsPhoto[] }>(this.baseUrl).pipe(
      // Hata durumunda boş bir dizi döndürmem gerekirse burada hallediyorum.
      catchError((error) => {
        console.error('Fotoğraf hatası:', error);
        return of({ photos: [] }); // Hata olduğunda fotoğraf verisi boş olacak.
      }),
      // Gelen veriyi düzenleyip, sadece fotoğrafları alıp döndürüyorum.
      map(response => response.photos) 
    );
  }
}
