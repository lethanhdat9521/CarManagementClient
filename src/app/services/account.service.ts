import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  login(data: any) {
    let url = environment.baseURL + 'Account/Login';
    return this.http.post(url, data);
  }
}
