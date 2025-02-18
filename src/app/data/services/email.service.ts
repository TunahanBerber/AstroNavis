import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiURL = 'http://localhost:3002/api/v1/email';

  constructor( private http: HttpClient) { }

  subscribeEmail(email: string) :Observable<any> {
    return this.http.post(this.apiURL, {email});
  }


  getEmails() :Observable<any> {
    return this.http.get(this.apiURL);
  }
}
