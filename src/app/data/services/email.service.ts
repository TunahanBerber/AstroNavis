import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly baseURL = 'https://astronavis-backend.vercel.app/api/v1/emails';

  constructor( private http: HttpClient) { }

  subscribeEmail(email: string) :Observable<any> {
    return this.http.post(this.baseURL, {email});
  }


  getEmails() :Observable<any> {
    return this.http.get(this.baseURL);
  }
}