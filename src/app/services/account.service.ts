import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthInterceptor } from '../inceptor/auth.interceptor';
import { TokenResponse } from '../models/TokenResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  login(data: any) {
    let url = environment.baseURL + 'Account/Login';
    //this.http.post()
    return this.http.post(url, data, { headers: { "Content-Type": 'application/json' } });
  }
  signUp(data: any) {

    let url = environment.baseURL + 'Account/Create'
    return this.http.post(url, data);
  }
  isAccessTokenExpired() {
    if (localStorage.getItem("AccessToken") == null) {
      return true;
    };
    var accesstoken: TokenResponse = JSON.parse(localStorage.getItem("AccessToken")!);
    let expi = new Date(accesstoken.expiredAt);
    // let t = new Date("1900-03-25")
    // console.log(t.toLocaleDateString())
    if (expi > new Date()) {
      return false;
    }
    return true;
  }
  isUserRole(roleFromRoute: string) {
    const roles = sessionStorage.getItem("app.roles");
    if (roles!.includes(",")) {
      if (roles === roleFromRoute) {
        return true;
      }
    } else {
      const roleArray = roles!.split(",");
      for (let role of roleArray) {
        if (role === roleFromRoute) {
          return true;
        }
      }
    }
    return false;
  }
  isPhoneDuplicated(data: string) {
    let url = environment.baseURL + 'Account/CheckingPhoneDuplicate'
    let queryParams = new HttpParams();
    queryParams = queryParams.append("phone", data);
    return this.http.get(url, { params: queryParams });
  }
  isEmailDuplicated(data: string) {
    let url = environment.baseURL + 'Account/CheckingEmailDuplicate'
    let queryParams = new HttpParams();
    queryParams = queryParams.append("email", data);
    return this.http.get(url, { params: queryParams });
  }
  getAccountInfo() {
    let url = environment.baseURL + 'Account/GetInfoById'
    return this.http.get(url);
  }
  updateInfo(data: any) {
    let url = environment.baseURL + 'Account/UpdateInfo';
    //this.http.post()
    return this.http.post(url, data, { headers: { "Content-Type": 'application/json' } });
  }
  getAdminStats() {
    let url = environment.baseURL + 'Account/GetAdminStats';
    //this.http.post()
    return this.http.get(url);
  }
  getAdminAccounts() {
    let url = environment.baseURL + 'Account/GetAdminAccounts';
    //this.http.post()
    return this.http.get(url);
  }
  updatePassword(data: any) {
    let url = environment.baseURL + 'Account/UpdatePassword';
    let queryParams = new HttpParams();
    queryParams = queryParams.append("oldPass", data.oldPassword);
    queryParams = queryParams.append("newPass", data.newPassword);
    console.log("Hello", data.oldPassword);
    return this.http.post(url + "?oldPass=" + data.oldPassword+"&newPass="+data.newPassword, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  getClientAccounts() {
    let url = environment.baseURL + 'Account/GetClientAccounts';
    //this.http.post()
    return this.http.get(url);
  }
  manageAccount(id: number): Observable<any> {
    return this.http.delete<any>(environment.baseURL + 'account/deactivate?id=' + id);
  }
}
