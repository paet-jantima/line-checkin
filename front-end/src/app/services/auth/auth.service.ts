import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { apiUrls } from 'src/app/api.urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isloggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn(): boolean {
    return this.isloggedIn$.value; // Returns the current value of the BehaviorSubject
  }

  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  loginLineService(loginLineObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}loginline`, loginLineObj);
  }
}
