import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  constructor(private http: HttpClient) { }

  checkRecaptcha(body:any) {
    return this.http.post('http://localhost:3000/subscribe', body);
  }
}
